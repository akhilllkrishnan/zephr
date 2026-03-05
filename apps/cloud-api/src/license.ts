/**
 * License validation
 * ──────────────────
 * Primary: validates against Lemon Squeezy API (when LEMON_SQUEEZY_API_KEY is set).
 * Fallback: validates against local ZEPHYR_LICENSE_KEYS env list (dev / air-gapped).
 */

import { validateLsLicenseKey } from "./lemonsqueezy";
import { ensureCloudEnvLoaded } from "./env";

ensureCloudEnvLoaded();

export type LicenseTier = "free" | "pro";
export type LicensePlan = "pro" | "team";
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
      const plan: LicensePlan | null = planRaw === "pro" || planRaw === "team" ? planRaw : null;
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

function validateLocal(key: string): LicenseValidationResult {
  if (revokedSet.has(key)) {
    return {
      valid: false, tier: "free", plan: null, status: "revoked",
      message: "This license key has been revoked. Contact support.", source: "local"
    };
  }

  const record = localTable.get(key);
  if (!record) {
    return {
      valid: false, tier: "free", plan: null, status: "invalid",
      message: "License key not found.", source: "local"
    };
  }

  if (record.expiresAt) {
    const t = Date.parse(record.expiresAt);
    if (Number.isFinite(t) && t < Date.now()) {
      return {
        valid: false, tier: "free", plan: null, status: "expired",
        message: "License key has expired.", expiresAt: record.expiresAt, source: "local"
      };
    }
  }

  return {
    valid: true, tier: "pro", plan: record.plan, status: "active",
    message: `License valid (${record.plan} plan).`, expiresAt: record.expiresAt, source: "local"
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
      source: "lemonsqueezy"
    };
  }

  const lk = result.license_key;
  const status = lk.status as LicenseStatus;

  if (status === "expired") {
    return {
      valid: false, tier: "free", plan: null, status: "expired",
      message: "License key has expired.", expiresAt: lk.expires_at ?? undefined,
      source: "lemonsqueezy"
    };
  }

  if (status === "disabled" || status === "inactive") {
    return {
      valid: false, tier: "free", plan: null, status: "revoked",
      message: "License key is inactive or has been disabled.", source: "lemonsqueezy"
    };
  }

  const activationsLeft = lk.activation_limit - lk.activation_usage;

  // Map LS variant name → Zephyr plan. Defaults to "pro".
  const variantName = result.meta?.variant_name?.toLowerCase() ?? "";
  const plan: LicensePlan = variantName.includes("team") ? "team" : "pro";

  return {
    valid: true,
    tier: "pro",
    plan,
    status: "active",
    message: `License valid (${plan} plan). ${activationsLeft} activations remaining.`,
    expiresAt: lk.expires_at ?? undefined,
    activationsLeft,
    source: "lemonsqueezy"
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
      message: "License key must not be empty."
    };
  }

  const hasLsApiKey = Boolean(process.env.LEMON_SQUEEZY_API_KEY?.trim());
  const looksLikeUuid = LS_KEY_PATTERN.test(key);

  // Use LS API when configured and the key format matches
  if (hasLsApiKey && looksLikeUuid) {
    try {
      return await validateViaCls(key);
    } catch (err) {
      console.error("[license] LS validation error, falling back to local:", err);
      // Fall through to local if LS is unreachable
    }
  }

  return validateLocal(key);
}
