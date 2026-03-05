import fs from "node:fs";
import path from "node:path";
import { LicensePlan, entitlementsForPlan } from "./billing";

export type StoredLicenseStatus = "active" | "invalid" | "revoked" | "expired" | "disabled" | "inactive";

export interface StoredLicenseRecord {
  key: string;
  tier: "free" | "pro";
  plan: LicensePlan | null;
  status: StoredLicenseStatus;
  message: string;
  source: "lemonsqueezy" | "local";
  entitlements: string[];
  expiresAt?: string;
  activationLimit?: number;
  activationUsage?: number;
  customerEmail?: string;
  lemonSqueezy?: {
    licenseId?: number;
    orderId?: number;
    productId?: number;
    variantId?: number;
    variantName?: string;
    productName?: string;
    storeId?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StoredActivationRecord {
  id: string;
  licenseKey: string;
  instanceName: string;
  status: "active" | "deactivated";
  createdAt: string;
  updatedAt: string;
  deactivatedAt?: string;
}

export interface StoredCustomerRecord {
  email: string;
  name?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  lastOrderId?: number;
}

export interface StoredOrderRecord {
  id: number;
  customerEmail?: string;
  customerName?: string;
  status?: string;
  productId?: number;
  productName?: string;
  variantId?: number;
  variantName?: string;
  plan?: LicensePlan;
  createdAt: string;
  updatedAt: string;
}

export interface StoredWebhookEvent {
  id: string;
  eventName: string;
  receivedAt: string;
  resourceId?: string;
}

interface LicenseStoreData {
  version: 1;
  licenses: Record<string, StoredLicenseRecord>;
  activations: Record<string, StoredActivationRecord>;
  customers: Record<string, StoredCustomerRecord>;
  orders: Record<string, StoredOrderRecord>;
  webhookEvents: Record<string, StoredWebhookEvent>;
}

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeKey(input: string): string {
  return input.trim().toLowerCase();
}

function defaultData(): LicenseStoreData {
  return {
    version: 1,
    licenses: {},
    activations: {},
    customers: {},
    orders: {},
    webhookEvents: {}
  };
}

function resolveStorePath(): string {
  const configured = process.env.ZEPHYR_LICENSE_STORE_PATH?.trim();
  if (configured) {
    return path.resolve(configured);
  }

  const cwd = process.cwd();
  const monorepoRootCandidate = path.resolve(cwd, "apps/cloud-api/data/license-store.json");
  if (fs.existsSync(path.resolve(cwd, "apps/cloud-api"))) {
    return monorepoRootCandidate;
  }

  const appRootCandidate = path.resolve(cwd, "data/license-store.json");
  if (
    path.basename(cwd) === "cloud-api" &&
    fs.existsSync(path.resolve(cwd, "src")) &&
    fs.existsSync(path.resolve(cwd, "tsconfig.json"))
  ) {
    return appRootCandidate;
  }

  return monorepoRootCandidate;
}

function loadFromDisk(filePath: string): LicenseStoreData {
  if (!fs.existsSync(filePath)) {
    return defaultData();
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) {
      return defaultData();
    }
    const parsed = JSON.parse(raw) as Partial<LicenseStoreData>;
    return {
      version: 1,
      licenses: parsed.licenses ?? {},
      activations: parsed.activations ?? {},
      customers: parsed.customers ?? {},
      orders: parsed.orders ?? {},
      webhookEvents: parsed.webhookEvents ?? {}
    };
  } catch (error) {
    console.warn(`[license-store] failed to load ${filePath}:`, error);
    return defaultData();
  }
}

class LicenseStore {
  private readonly filePath: string;
  private writeEnabled = true;
  private data: LicenseStoreData;

  constructor() {
    this.filePath = resolveStorePath();
    this.data = loadFromDisk(this.filePath);
  }

  getFilePath(): string {
    return this.filePath;
  }

  getLicense(licenseKey: string): StoredLicenseRecord | null {
    const record = this.data.licenses[normalizeKey(licenseKey)];
    return record ?? null;
  }

  upsertLicense(
    licenseKey: string,
    next: Omit<StoredLicenseRecord, "key" | "createdAt" | "updatedAt" | "entitlements">
  ): StoredLicenseRecord {
    const key = normalizeKey(licenseKey);
    const current = this.data.licenses[key];
    const timestamp = nowIso();
    const plan = next.plan ?? current?.plan ?? null;
    const record: StoredLicenseRecord = {
      key: licenseKey.trim(),
      tier: next.tier,
      plan,
      status: next.status,
      message: next.message,
      source: next.source,
      entitlements: entitlementsForPlan(plan),
      expiresAt: next.expiresAt,
      activationLimit: next.activationLimit,
      activationUsage: next.activationUsage,
      customerEmail: next.customerEmail ?? current?.customerEmail,
      lemonSqueezy: {
        ...current?.lemonSqueezy,
        ...next.lemonSqueezy
      },
      createdAt: current?.createdAt ?? timestamp,
      updatedAt: timestamp
    };

    this.data.licenses[key] = record;
    this.persist();
    return record;
  }

  listActiveActivations(licenseKey: string): StoredActivationRecord[] {
    const key = normalizeKey(licenseKey);
    return Object.values(this.data.activations).filter(
      (record) => normalizeKey(record.licenseKey) === key && record.status === "active"
    );
  }

  upsertActivation(input: {
    id: string;
    licenseKey: string;
    instanceName: string;
  }): StoredActivationRecord {
    const id = input.id.trim();
    const existing = this.data.activations[id];
    const timestamp = nowIso();

    const record: StoredActivationRecord = {
      id,
      licenseKey: input.licenseKey.trim(),
      instanceName: input.instanceName.trim(),
      status: "active",
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      deactivatedAt: undefined
    };

    this.data.activations[id] = record;
    this.persist();
    return record;
  }

  deactivateActivation(instanceId: string, licenseKey?: string): StoredActivationRecord | null {
    const id = instanceId.trim();
    const existing = this.data.activations[id];
    if (!existing) {
      return null;
    }

    if (licenseKey && normalizeKey(existing.licenseKey) !== normalizeKey(licenseKey)) {
      return null;
    }

    const timestamp = nowIso();
    const updated: StoredActivationRecord = {
      ...existing,
      status: "deactivated",
      updatedAt: timestamp,
      deactivatedAt: timestamp
    };

    this.data.activations[id] = updated;
    this.persist();
    return updated;
  }

  upsertOrder(input: Omit<StoredOrderRecord, "createdAt" | "updatedAt">): StoredOrderRecord {
    const id = String(input.id);
    const existing = this.data.orders[id];
    const timestamp = nowIso();

    const record: StoredOrderRecord = {
      ...existing,
      ...input,
      id: input.id,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp
    };

    this.data.orders[id] = record;
    this.persist();
    return record;
  }

  getOrder(orderId: number): StoredOrderRecord | null {
    return this.data.orders[String(orderId)] ?? null;
  }

  upsertCustomer(input: {
    email: string;
    name?: string;
    lastOrderId?: number;
  }): StoredCustomerRecord {
    const key = input.email.trim().toLowerCase();
    const existing = this.data.customers[key];
    const timestamp = nowIso();

    const record: StoredCustomerRecord = {
      email: input.email.trim(),
      name: input.name ?? existing?.name,
      firstSeenAt: existing?.firstSeenAt ?? timestamp,
      lastSeenAt: timestamp,
      lastOrderId: input.lastOrderId ?? existing?.lastOrderId
    };

    this.data.customers[key] = record;
    this.persist();
    return record;
  }

  /**
   * Returns true when event is new, false if duplicate (already seen).
   */
  recordWebhookEvent(id: string, eventName: string, resourceId?: string): boolean {
    const key = id.trim();
    if (!key) {
      return true;
    }

    if (this.data.webhookEvents[key]) {
      return false;
    }

    this.data.webhookEvents[key] = {
      id: key,
      eventName,
      resourceId,
      receivedAt: nowIso()
    };
    this.persist();
    return true;
  }

  private persist(): void {
    if (!this.writeEnabled) {
      return;
    }

    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const tmpPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), "utf8");
      fs.renameSync(tmpPath, this.filePath);
    } catch (error) {
      this.writeEnabled = false;
      console.warn(`[license-store] persistence disabled after write failure (${this.filePath}).`, error);
    }
  }
}

export function buildWebhookEventId(eventName: string, dataId?: string, webhookId?: string): string {
  return [eventName, dataId ?? "", webhookId ?? ""].join(":");
}

export const licenseStore = new LicenseStore();
