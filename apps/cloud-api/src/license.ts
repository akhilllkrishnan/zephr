/**
 * License validation
 * ──────────────────
 * Primary: validates against Lemon Squeezy API (when LEMON_SQUEEZY_API_KEY is set).
 * Fallback: validates against local ZEPHYR_LICENSE_KEYS env list (dev / air-gapped).
 */

import { validateLsLicenseKey } from "./lemonsqueezy";
import { ensureCloudEnvLoaded } from "./env";
import { LicensePlan, entitlementsForPlan, resolvePlan } from "./billing";
import { StoredLicenseRecord, licenseStore } from "./licenseStore";

ensureCloudEnvLoaded();

export type LicenseTier = "free" | "pro";
export type LicenseStatus = "active" | "invalid" | "revoked" | "expired" | "disabled" | "inactive";

export interface LicenseValidationResult {
  valid: boolean;
  tier: LicenseTier;
  plan: LicensePlan | null;
  status: LicenseStatus;
  message: string;
  expiresAt?: string;
  /** Set when result came from Lemon Squeezy */
  source?: "lemonsqueezy" | "local";
  /** Activations remaining (LS only) */
  activationsLeft?: number;
  /** Plan-scoped capabilities for client feature gating */
  entitlements?: string[];
}

// ─── Local / dev fallback ─────────────────────────────────────────────────────

interface LocalLicenseRecord {
  key: string;
  plan: LicensePlan;
  expiresAt?: string;
}

const DEV_KEYS: LocalLicenseRecord[] = [
  { key: "dev_local_key", plan: "pro" },
  { key: "zephyr-pro-demo-2026", plan: "pro", expiresAt: "2027-12-31T23:59:59.000Z" },
  { key: "zephyr-team-demo-2026", plan: "team", expiresAt: "2027-12-31T23:59:59.000Z" }
];

function buildLocalTable(): Map<string, LocalLicenseRecord> {
  const table = new Map<string, LocalLicenseRecord>();
  for (const r of DEV_KEYS) table.set(r.key, r);

  const envRaw = process.env.ZEPHYR_LICENSE_KEYS?.trim();
  if (envRaw) {
    for (const token of envRaw.split(",").map(s => s.trim()).filter(Boolean)) {
      const [key = "", planRaw = "", expiresRaw = ""] = token.split(":").map(s => s.trim());
      const normalized = planRaw.toLowerCase();
      const plan: LicensePlan | null =
        normalized === "individual" ||
        normalized === "startup" ||
        normalized === "enterprise" ||
        normalized === "pro" ||
        normalized === "team"
          ? normalized
          : null;
      if (key && plan) table.set(key, { key, plan, expiresAt: expiresRaw || undefined });
    }
  }
  return table;
}

function buildRevokedSet(): Set<string> {
  const set = new Set<string>();
  const raw = process.env.ZEPHYR_REVOKED_LICENSE_KEYS?.trim();
  if (raw) for (const k of raw.split(",").map(s => s.trim()).filter(Boolean)) set.add(k);
  return set;
}

const localTable = buildLocalTable();
const revokedSet = buildRevokedSet();

function parseBooleanEnv(raw: string | undefined): boolean | null {
  if (!raw) {
    return null;
  }

  const normalized = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return null;
}

function allowLocalFallback(): boolean {
  const explicit = parseBooleanEnv(process.env.ZEPHYR_ALLOW_LOCAL_LICENSE_FALLBACK);
  if (explicit !== null) {
    return explicit;
  }

  // Default-safe behavior:
  // - development/test: allow fallback
  // - production: disable fallback
  return process.env.NODE_ENV !== "production";
}

function mapStoredToValidation(record: StoredLicenseRecord): LicenseValidationResult {
  const isActive = record.status === "active";
  const activationLimit = record.activationLimit ?? 0;
  const activationUsage = record.activationUsage ?? 0;
  const activationsLeft =
    activationLimit > 0 ? Math.max(activationLimit - activationUsage, 0) : undefined;

  return {
    valid: isActive,
    tier: isActive ? "pro" : "free",
    plan: isActive ? record.plan : null,
    status: record.status,
    message: record.message,
    expiresAt: record.expiresAt,
    source: record.source,
    activationsLeft,
    entitlements: isActive ? record.entitlements : []
  };
}

function validateLocal(key: string): LicenseValidationResult {
  if (revokedSet.has(key)) {
    return {
      valid: false, tier: "free", plan: null, status: "revoked",
      message: "This license key has been revoked. Contact support.", source: "local",
      entitlements: []
    };
  }

  const record = localTable.get(key);
  if (!record) {
    return {
      valid: false, tier: "free", plan: null, status: "invalid",
      message: "License key not found.", source: "local",
      entitlements: []
    };
  }

  if (record.expiresAt) {
    const t = Date.parse(record.expiresAt);
    if (Number.isFinite(t) && t < Date.now()) {
      return {
        valid: false, tier: "free", plan: null, status: "expired",
        message: "License key has expired.", expiresAt: record.expiresAt, source: "local",
        entitlements: []
      };
    }
  }

  return {
    valid: true, tier: "pro", plan: record.plan, status: "active",
    message: `License valid (${record.plan} plan).`, expiresAt: record.expiresAt, source: "local",
    entitlements: entitlementsForPlan(record.plan)
  };
}

// ─── Lemon Squeezy validation ─────────────────────────────────────────────────

async function validateViaCls(key: string): Promise<LicenseValidationResult> {
  const result = await validateLsLicenseKey(key);

  if (!result.valid || !result.license_key) {
    return {
      valid: false,
      tier: "free",
      plan: null,
      status: "invalid",
      message: result.error ?? "Invalid license key.",
      source: "lemonsqueezy",
      entitlements: []
    };
  }

  const lk = result.license_key;
  const status = lk.status as LicenseStatus;

  if (status === "expired") {
    return {
      valid: false, tier: "free", plan: null, status: "expired",
      message: "License key has expired.", expiresAt: lk.expires_at ?? undefined,
      source: "lemonsqueezy",
      entitlements: []
    };
  }

  if (status === "disabled" || status === "inactive") {
    return {
      valid: false, tier: "free", plan: null, status: "revoked",
      message: "License key is inactive or has been disabled.", source: "lemonsqueezy",
      entitlements: []
    };
  }

  const activationsLeft = lk.activation_limit - lk.activation_usage;
  const plan = resolvePlan({
    variantId: result.meta?.variant_id,
    variantName: result.meta?.variant_name,
    productName: result.meta?.product_name
  });
  const entitlements = entitlementsForPlan(plan);

  return {
    valid: true,
    tier: "pro",
    plan,
    status: "active",
    message: `License valid (${plan} plan). ${activationsLeft} activations remaining.`,
    expiresAt: lk.expires_at ?? undefined,
    activationsLeft,
    source: "lemonsqueezy",
    entitlements
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

const LS_KEY_PATTERN = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/;

/**
 * Validate a license key.
 *
 * - If LEMON_SQUEEZY_API_KEY is set AND the key looks like a LS UUID → call LS API.
 * - Otherwise fall back to local table (dev keys + ZEPHYR_LICENSE_KEYS env).
 */
export async function validateLicenseKey(
  input: string
): Promise<LicenseValidationResult> {
  const key = input.trim();

  if (!key) {
    return {
      valid: false, tier: "free", plan: null, status: "invalid",
      message: "License key must not be empty.",
      entitlements: []
    };
  }

  const stored = licenseStore.getLicense(key);
  if (stored) {
    return mapStoredToValidation(stored);
  }

  const hasLsApiKey = Boolean(process.env.LEMON_SQUEEZY_API_KEY?.trim());
  const looksLikeUuid = LS_KEY_PATTERN.test(key);

  // Use LS API when configured and the key format matches
  if (hasLsApiKey && looksLikeUuid) {
    try {
      const validated = await validateViaCls(key);
      licenseStore.upsertLicense(key, {
        tier: validated.tier,
        plan: validated.plan,
        status: validated.status,
        message: validated.message,
        source: "lemonsqueezy",
        expiresAt: validated.expiresAt
      });
      return validated;
    } catch (err) {
      console.error("[license] LS validation error, falling back to local:", err);
      // Fall through (local only if enabled)
    }
  }

  if (allowLocalFallback()) {
    const local = validateLocal(key);
    if (local.valid) {
      licenseStore.upsertLicense(key, {
        tier: "pro",
        plan: local.plan,
        status: "active",
        message: local.message,
        source: "local",
        expiresAt: local.expiresAt
      });
    }
    return local;
  }

  return {
    valid: false,
    tier: "free",
    plan: null,
    status: "invalid",
    message:
      "License validation unavailable. Check license key format and Lemon Squeezy configuration.",
    source: "lemonsqueezy",
    entitlements: []
  };
}
