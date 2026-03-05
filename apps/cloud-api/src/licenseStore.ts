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

type StoreBackend = "supabase" | "file";

interface SupabaseConfig {
  url: string;
  serviceRoleKey: string;
}

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeKey(input: string): string {
  return input.trim().toLowerCase();
}

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

function parsePlan(raw: unknown): LicensePlan | null {
  if (typeof raw !== "string") {
    return null;
  }
  const normalized = raw.trim().toLowerCase();
  return normalized === "individual" ||
    normalized === "startup" ||
    normalized === "enterprise" ||
    normalized === "pro" ||
    normalized === "team"
    ? normalized
    : null;
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

function resolveSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !serviceRoleKey) {
    return null;
  }
  return { url: url.replace(/\/$/, ""), serviceRoleKey };
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function toOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function mapLicenseRow(row: Record<string, unknown>): StoredLicenseRecord {
  const plan = parsePlan(row.plan);
  return {
    key: String(row.key ?? ""),
    tier: row.tier === "pro" ? "pro" : "free",
    plan,
    status: String(row.status ?? "invalid") as StoredLicenseStatus,
    message: String(row.message ?? ""),
    source: row.source === "lemonsqueezy" ? "lemonsqueezy" : "local",
    entitlements: Array.isArray(row.entitlements)
      ? row.entitlements.filter((value): value is string => typeof value === "string")
      : entitlementsForPlan(plan),
    expiresAt: toOptionalString(row.expires_at),
    activationLimit: toOptionalNumber(row.activation_limit),
    activationUsage: toOptionalNumber(row.activation_usage),
    customerEmail: toOptionalString(row.customer_email),
    lemonSqueezy: (row.lemon_squeezy as StoredLicenseRecord["lemonSqueezy"]) ?? undefined,
    createdAt: String(row.created_at ?? nowIso()),
    updatedAt: String(row.updated_at ?? nowIso())
  };
}

function mapActivationRow(row: Record<string, unknown>): StoredActivationRecord {
  return {
    id: String(row.id ?? ""),
    licenseKey: String(row.license_key ?? ""),
    instanceName: String(row.instance_name ?? ""),
    status: row.status === "deactivated" ? "deactivated" : "active",
    createdAt: String(row.created_at ?? nowIso()),
    updatedAt: String(row.updated_at ?? nowIso()),
    deactivatedAt: toOptionalString(row.deactivated_at)
  };
}

function mapOrderRow(row: Record<string, unknown>): StoredOrderRecord {
  return {
    id: Number(row.id),
    customerEmail: toOptionalString(row.customer_email),
    customerName: toOptionalString(row.customer_name),
    status: toOptionalString(row.status),
    productId: toOptionalNumber(row.product_id),
    productName: toOptionalString(row.product_name),
    variantId: toOptionalNumber(row.variant_id),
    variantName: toOptionalString(row.variant_name),
    plan: parsePlan(row.plan) ?? undefined,
    createdAt: String(row.created_at ?? nowIso()),
    updatedAt: String(row.updated_at ?? nowIso())
  };
}

interface LicenseStoreAdapter {
  getBackend(): StoreBackend;
  getFilePath(): string | null;
  getSupabaseUrl(): string | null;
  getLicense(licenseKey: string): Promise<StoredLicenseRecord | null>;
  upsertLicense(
    licenseKey: string,
    next: Omit<StoredLicenseRecord, "key" | "createdAt" | "updatedAt" | "entitlements">
  ): Promise<StoredLicenseRecord>;
  listActiveActivations(licenseKey: string): Promise<StoredActivationRecord[]>;
  upsertActivation(input: { id: string; licenseKey: string; instanceName: string }): Promise<StoredActivationRecord>;
  deactivateActivation(instanceId: string, licenseKey?: string): Promise<StoredActivationRecord | null>;
  upsertOrder(input: Omit<StoredOrderRecord, "createdAt" | "updatedAt">): Promise<StoredOrderRecord>;
  getOrder(orderId: number): Promise<StoredOrderRecord | null>;
  upsertCustomer(input: { email: string; name?: string; lastOrderId?: number }): Promise<StoredCustomerRecord>;
  recordWebhookEvent(id: string, eventName: string, resourceId?: string): Promise<boolean>;
}

class FileLicenseStore implements LicenseStoreAdapter {
  private readonly filePath: string;
  private writeEnabled = true;
  private data: LicenseStoreData;

  constructor() {
    this.filePath = resolveStorePath();
    this.data = loadFromDisk(this.filePath);
  }

  getBackend(): StoreBackend {
    return "file";
  }

  getFilePath(): string {
    return this.filePath;
  }

  getSupabaseUrl(): null {
    return null;
  }

  async getLicense(licenseKey: string): Promise<StoredLicenseRecord | null> {
    const record = this.data.licenses[normalizeKey(licenseKey)];
    return record ?? null;
  }

  async upsertLicense(
    licenseKey: string,
    next: Omit<StoredLicenseRecord, "key" | "createdAt" | "updatedAt" | "entitlements">
  ): Promise<StoredLicenseRecord> {
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

  async listActiveActivations(licenseKey: string): Promise<StoredActivationRecord[]> {
    const key = normalizeKey(licenseKey);
    return Object.values(this.data.activations).filter(
      (record) => normalizeKey(record.licenseKey) === key && record.status === "active"
    );
  }

  async upsertActivation(input: { id: string; licenseKey: string; instanceName: string }): Promise<StoredActivationRecord> {
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

  async deactivateActivation(instanceId: string, licenseKey?: string): Promise<StoredActivationRecord | null> {
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

  async upsertOrder(input: Omit<StoredOrderRecord, "createdAt" | "updatedAt">): Promise<StoredOrderRecord> {
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

  async getOrder(orderId: number): Promise<StoredOrderRecord | null> {
    return this.data.orders[String(orderId)] ?? null;
  }

  async upsertCustomer(input: { email: string; name?: string; lastOrderId?: number }): Promise<StoredCustomerRecord> {
    const key = normalizeEmail(input.email);
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

  async recordWebhookEvent(id: string, eventName: string, resourceId?: string): Promise<boolean> {
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

class SupabaseLicenseStore implements LicenseStoreAdapter {
  constructor(private readonly config: SupabaseConfig) {}

  getBackend(): StoreBackend {
    return "supabase";
  }

  getFilePath(): null {
    return null;
  }

  getSupabaseUrl(): string {
    return this.config.url;
  }

  async getLicense(licenseKey: string): Promise<StoredLicenseRecord | null> {
    const key = normalizeKey(licenseKey);
    const rows = await this.selectRows("zephyr_licenses", {
      key: `eq.${encodeURIComponent(key)}`
    });
    if (!rows[0]) {
      return null;
    }
    return mapLicenseRow(rows[0]);
  }

  async upsertLicense(
    licenseKey: string,
    next: Omit<StoredLicenseRecord, "key" | "createdAt" | "updatedAt" | "entitlements">
  ): Promise<StoredLicenseRecord> {
    const existing = await this.getLicense(licenseKey);
    const timestamp = nowIso();
    const plan = next.plan ?? existing?.plan ?? null;
    const row = {
      key: normalizeKey(licenseKey),
      tier: next.tier,
      plan,
      status: next.status,
      message: next.message,
      source: next.source,
      entitlements: entitlementsForPlan(plan),
      expires_at: next.expiresAt ?? null,
      activation_limit: next.activationLimit ?? null,
      activation_usage: next.activationUsage ?? null,
      customer_email: next.customerEmail ?? existing?.customerEmail ?? null,
      lemon_squeezy: { ...(existing?.lemonSqueezy ?? {}), ...(next.lemonSqueezy ?? {}) },
      created_at: existing?.createdAt ?? timestamp,
      updated_at: timestamp
    };

    const rows = await this.upsertRows("zephyr_licenses", [row], "key");
    if (!rows[0]) {
      throw new Error("Failed to upsert license row.");
    }
    return mapLicenseRow(rows[0]);
  }

  async listActiveActivations(licenseKey: string): Promise<StoredActivationRecord[]> {
    const key = normalizeKey(licenseKey);
    const rows = await this.selectRows("zephyr_activations", {
      license_key: `eq.${encodeURIComponent(key)}`,
      status: "eq.active"
    });
    return rows.map(mapActivationRow);
  }

  async upsertActivation(input: { id: string; licenseKey: string; instanceName: string }): Promise<StoredActivationRecord> {
    const existingRows = await this.selectRows("zephyr_activations", {
      id: `eq.${encodeURIComponent(input.id.trim())}`
    });
    const existing = existingRows[0] ? mapActivationRow(existingRows[0]) : null;
    const timestamp = nowIso();
    const row = {
      id: input.id.trim(),
      license_key: normalizeKey(input.licenseKey),
      instance_name: input.instanceName.trim(),
      status: "active",
      created_at: existing?.createdAt ?? timestamp,
      updated_at: timestamp,
      deactivated_at: null
    };
    const rows = await this.upsertRows("zephyr_activations", [row], "id");
    if (!rows[0]) {
      throw new Error("Failed to upsert activation row.");
    }
    return mapActivationRow(rows[0]);
  }

  async deactivateActivation(instanceId: string, licenseKey?: string): Promise<StoredActivationRecord | null> {
    const normalizedId = instanceId.trim();
    const existingRows = await this.selectRows("zephyr_activations", {
      id: `eq.${encodeURIComponent(normalizedId)}`
    });
    if (!existingRows[0]) {
      return null;
    }
    const existing = mapActivationRow(existingRows[0]);
    if (licenseKey && normalizeKey(existing.licenseKey) !== normalizeKey(licenseKey)) {
      return null;
    }
    const timestamp = nowIso();
    const rows = await this.patchRows(
      "zephyr_activations",
      {
        status: "deactivated",
        updated_at: timestamp,
        deactivated_at: timestamp
      },
      {
        id: `eq.${encodeURIComponent(normalizedId)}`
      }
    );
    if (!rows[0]) {
      return null;
    }
    return mapActivationRow(rows[0]);
  }

  async upsertOrder(input: Omit<StoredOrderRecord, "createdAt" | "updatedAt">): Promise<StoredOrderRecord> {
    const existing = await this.getOrder(input.id);
    const timestamp = nowIso();
    const row = {
      id: input.id,
      customer_email: input.customerEmail ?? existing?.customerEmail ?? null,
      customer_name: input.customerName ?? existing?.customerName ?? null,
      status: input.status ?? existing?.status ?? null,
      product_id: input.productId ?? existing?.productId ?? null,
      product_name: input.productName ?? existing?.productName ?? null,
      variant_id: input.variantId ?? existing?.variantId ?? null,
      variant_name: input.variantName ?? existing?.variantName ?? null,
      plan: input.plan ?? existing?.plan ?? null,
      created_at: existing?.createdAt ?? timestamp,
      updated_at: timestamp
    };
    const rows = await this.upsertRows("zephyr_orders", [row], "id");
    if (!rows[0]) {
      throw new Error("Failed to upsert order row.");
    }
    return mapOrderRow(rows[0]);
  }

  async getOrder(orderId: number): Promise<StoredOrderRecord | null> {
    const rows = await this.selectRows("zephyr_orders", {
      id: `eq.${orderId}`
    });
    if (!rows[0]) {
      return null;
    }
    return mapOrderRow(rows[0]);
  }

  async upsertCustomer(input: { email: string; name?: string; lastOrderId?: number }): Promise<StoredCustomerRecord> {
    const normalized = normalizeEmail(input.email);
    const existingRows = await this.selectRows("zephyr_customers", {
      email: `eq.${encodeURIComponent(normalized)}`
    });
    const existing = existingRows[0];
    const timestamp = nowIso();
    const row = {
      email: normalized,
      name: input.name ?? toOptionalString(existing?.name) ?? null,
      first_seen_at: toOptionalString(existing?.first_seen_at) ?? timestamp,
      last_seen_at: timestamp,
      last_order_id: input.lastOrderId ?? toOptionalNumber(existing?.last_order_id) ?? null
    };
    const rows = await this.upsertRows("zephyr_customers", [row], "email");
    if (!rows[0]) {
      throw new Error("Failed to upsert customer row.");
    }
    return {
      email: String(rows[0].email ?? normalized),
      name: toOptionalString(rows[0].name),
      firstSeenAt: String(rows[0].first_seen_at ?? timestamp),
      lastSeenAt: String(rows[0].last_seen_at ?? timestamp),
      lastOrderId: toOptionalNumber(rows[0].last_order_id)
    };
  }

  async recordWebhookEvent(id: string, eventName: string, resourceId?: string): Promise<boolean> {
    const key = id.trim();
    if (!key) {
      return true;
    }

    const existing = await this.selectRows("zephyr_webhook_events", {
      id: `eq.${encodeURIComponent(key)}`
    });
    if (existing.length > 0) {
      return false;
    }

    const rows = await this.insertRows("zephyr_webhook_events", [
      {
        id: key,
        event_name: eventName,
        resource_id: resourceId ?? null,
        received_at: nowIso()
      }
    ]);
    return rows.length > 0;
  }

  private async selectRows(
    table: string,
    filters: Record<string, string> = {},
    select = "*"
  ): Promise<Array<Record<string, unknown>>> {
    const query = new URLSearchParams();
    query.set("select", select);
    for (const [key, value] of Object.entries(filters)) {
      query.set(key, value);
    }

    const response = await fetch(`${this.config.url}/rest/v1/${table}?${query.toString()}`, {
      headers: {
        apikey: this.config.serviceRoleKey,
        Authorization: `Bearer ${this.config.serviceRoleKey}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`[supabase] select ${table} failed: ${response.status} ${errorBody}`);
    }
    return (await response.json()) as Array<Record<string, unknown>>;
  }

  private async insertRows(table: string, rows: Array<Record<string, unknown>>): Promise<Array<Record<string, unknown>>> {
    const response = await fetch(`${this.config.url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: this.config.serviceRoleKey,
        Authorization: `Bearer ${this.config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(rows)
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`[supabase] insert ${table} failed: ${response.status} ${errorBody}`);
    }
    return (await response.json()) as Array<Record<string, unknown>>;
  }

  private async upsertRows(
    table: string,
    rows: Array<Record<string, unknown>>,
    conflictColumn: string
  ): Promise<Array<Record<string, unknown>>> {
    const response = await fetch(
      `${this.config.url}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflictColumn)}`,
      {
        method: "POST",
        headers: {
          apikey: this.config.serviceRoleKey,
          Authorization: `Bearer ${this.config.serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify(rows)
      }
    );
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`[supabase] upsert ${table} failed: ${response.status} ${errorBody}`);
    }
    return (await response.json()) as Array<Record<string, unknown>>;
  }

  private async patchRows(
    table: string,
    payload: Record<string, unknown>,
    filters: Record<string, string>
  ): Promise<Array<Record<string, unknown>>> {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      query.set(key, value);
    }
    const response = await fetch(`${this.config.url}/rest/v1/${table}?${query.toString()}`, {
      method: "PATCH",
      headers: {
        apikey: this.config.serviceRoleKey,
        Authorization: `Bearer ${this.config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`[supabase] patch ${table} failed: ${response.status} ${errorBody}`);
    }
    return (await response.json()) as Array<Record<string, unknown>>;
  }
}

class HybridLicenseStore implements LicenseStoreAdapter {
  constructor(
    private readonly primary: SupabaseLicenseStore,
    private readonly fallback: FileLicenseStore
  ) {}

  getBackend(): StoreBackend {
    return this.primary.getBackend();
  }

  getFilePath(): string {
    return this.fallback.getFilePath();
  }

  getSupabaseUrl(): string {
    return this.primary.getSupabaseUrl();
  }

  async getLicense(licenseKey: string): Promise<StoredLicenseRecord | null> {
    try {
      const record = await this.primary.getLicense(licenseKey);
      if (record) {
        return record;
      }
    } catch (error) {
      console.warn("[license-store] supabase getLicense failed; using fallback store.", error);
    }
    return this.fallback.getLicense(licenseKey);
  }

  async upsertLicense(
    licenseKey: string,
    next: Omit<StoredLicenseRecord, "key" | "createdAt" | "updatedAt" | "entitlements">
  ): Promise<StoredLicenseRecord> {
    try {
      return await this.primary.upsertLicense(licenseKey, next);
    } catch (error) {
      console.warn("[license-store] supabase upsertLicense failed; using fallback store.", error);
      return this.fallback.upsertLicense(licenseKey, next);
    }
  }

  async listActiveActivations(licenseKey: string): Promise<StoredActivationRecord[]> {
    try {
      return await this.primary.listActiveActivations(licenseKey);
    } catch (error) {
      console.warn("[license-store] supabase listActiveActivations failed; using fallback store.", error);
      return this.fallback.listActiveActivations(licenseKey);
    }
  }

  async upsertActivation(input: { id: string; licenseKey: string; instanceName: string }): Promise<StoredActivationRecord> {
    try {
      return await this.primary.upsertActivation(input);
    } catch (error) {
      console.warn("[license-store] supabase upsertActivation failed; using fallback store.", error);
      return this.fallback.upsertActivation(input);
    }
  }

  async deactivateActivation(instanceId: string, licenseKey?: string): Promise<StoredActivationRecord | null> {
    try {
      return await this.primary.deactivateActivation(instanceId, licenseKey);
    } catch (error) {
      console.warn("[license-store] supabase deactivateActivation failed; using fallback store.", error);
      return this.fallback.deactivateActivation(instanceId, licenseKey);
    }
  }

  async upsertOrder(input: Omit<StoredOrderRecord, "createdAt" | "updatedAt">): Promise<StoredOrderRecord> {
    try {
      return await this.primary.upsertOrder(input);
    } catch (error) {
      console.warn("[license-store] supabase upsertOrder failed; using fallback store.", error);
      return this.fallback.upsertOrder(input);
    }
  }

  async getOrder(orderId: number): Promise<StoredOrderRecord | null> {
    try {
      const order = await this.primary.getOrder(orderId);
      if (order) {
        return order;
      }
    } catch (error) {
      console.warn("[license-store] supabase getOrder failed; using fallback store.", error);
    }
    return this.fallback.getOrder(orderId);
  }

  async upsertCustomer(input: { email: string; name?: string; lastOrderId?: number }): Promise<StoredCustomerRecord> {
    try {
      return await this.primary.upsertCustomer(input);
    } catch (error) {
      console.warn("[license-store] supabase upsertCustomer failed; using fallback store.", error);
      return this.fallback.upsertCustomer(input);
    }
  }

  async recordWebhookEvent(id: string, eventName: string, resourceId?: string): Promise<boolean> {
    try {
      return await this.primary.recordWebhookEvent(id, eventName, resourceId);
    } catch (error) {
      console.warn("[license-store] supabase recordWebhookEvent failed; using fallback store.", error);
      return this.fallback.recordWebhookEvent(id, eventName, resourceId);
    }
  }
}

function createLicenseStore(): LicenseStoreAdapter {
  const fileStore = new FileLicenseStore();
  const supabaseConfig = resolveSupabaseConfig();
  if (!supabaseConfig) {
    return fileStore;
  }
  return new HybridLicenseStore(new SupabaseLicenseStore(supabaseConfig), fileStore);
}

export function buildWebhookEventId(eventName: string, dataId?: string, webhookId?: string): string {
  return [eventName, dataId ?? "", webhookId ?? ""].join(":");
}

export const licenseStore = createLicenseStore();
