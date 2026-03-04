export type LicenseTier = "free" | "pro";
export type LicensePlan = "pro" | "team";
export type LicenseStatus = "active" | "invalid" | "revoked" | "expired";

interface LicenseRecord {
  key: string;
  plan: LicensePlan;
  expiresAt?: string;
}

export interface LicenseValidationResult {
  valid: boolean;
  tier: LicenseTier;
  plan: LicensePlan | null;
  status: LicenseStatus;
  message: string;
  expiresAt?: string;
}

const DEFAULT_LICENSES: LicenseRecord[] = [
  { key: "zephyr-pro-demo-2026", plan: "pro", expiresAt: "2027-12-31T23:59:59.000Z" },
  { key: "zephyr-team-demo-2026", plan: "team", expiresAt: "2027-12-31T23:59:59.000Z" }
];

function parsePlan(raw: string): LicensePlan | null {
  if (raw === "pro" || raw === "team") {
    return raw;
  }
  return null;
}

function parseLicenseRecordsFromEnv(): Map<string, LicenseRecord> {
  const table = new Map<string, LicenseRecord>();

  for (const item of DEFAULT_LICENSES) {
    table.set(item.key, item);
  }

  const envRaw = process.env.ZEPHYR_LICENSE_KEYS?.trim();
  if (!envRaw) {
    return table;
  }

  for (const token of envRaw.split(",").map((part) => part.trim()).filter(Boolean)) {
    const [keyRaw, planRaw, expiresRaw] = token.split(":").map((part) => part.trim());
    const key = keyRaw ?? "";
    const plan = parsePlan(planRaw ?? "");

    if (!key || !plan) {
      continue;
    }

    table.set(key, {
      key,
      plan,
      expiresAt: expiresRaw || undefined
    });
  }

  return table;
}

function parseRevokedFromEnv(): Set<string> {
  const revoked = new Set<string>();
  const envRaw = process.env.ZEPHYR_REVOKED_LICENSE_KEYS?.trim();
  if (!envRaw) {
    return revoked;
  }

  for (const key of envRaw.split(",").map((part) => part.trim()).filter(Boolean)) {
    revoked.add(key);
  }

  return revoked;
}

const knownLicenses = parseLicenseRecordsFromEnv();
const revokedLicenses = parseRevokedFromEnv();

export function validateLicenseKey(input: string): LicenseValidationResult {
  const key = input.trim();
  const keyLooksValid = /^zephyr-[a-z0-9-]{8,}$/i.test(key);

  if (!keyLooksValid) {
    return {
      valid: false,
      tier: "free",
      plan: null,
      status: "invalid",
      message: "Invalid key format. Expected format: zephyr-xxxxxxxx."
    };
  }

  if (revokedLicenses.has(key)) {
    return {
      valid: false,
      tier: "free",
      plan: null,
      status: "revoked",
      message: "This license key has been revoked. Contact support."
    };
  }

  const record = knownLicenses.get(key);
  if (!record) {
    return {
      valid: false,
      tier: "free",
      plan: null,
      status: "invalid",
      message: "License key not found."
    };
  }

  if (record.expiresAt) {
    const expiryTime = Date.parse(record.expiresAt);
    if (Number.isFinite(expiryTime) && expiryTime < Date.now()) {
      return {
        valid: false,
        tier: "free",
        plan: null,
        status: "expired",
        message: "License key has expired.",
        expiresAt: new Date(expiryTime).toISOString()
      };
    }
  }

  return {
    valid: true,
    tier: "pro",
    plan: record.plan,
    status: "active",
    message: `License valid (${record.plan} plan).`,
    expiresAt: record.expiresAt
  };
}
