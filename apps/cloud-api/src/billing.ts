import { ensureCloudEnvLoaded } from "./env";

ensureCloudEnvLoaded();

export type LicensePlan = "individual" | "startup" | "enterprise" | "pro" | "team";

export interface PlanResolutionInput {
  variantId?: number;
  variantName?: string;
  productName?: string;
}

export interface BillingPlanDefinition {
  id: "individual" | "startup" | "enterprise";
  label: string;
  description: string;
  recommended?: boolean;
  checkoutUrl?: string;
}

function parseOptionalInt(raw: string | undefined): number | undefined {
  if (!raw) {
    return undefined;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getEnvVariantMapping(): {
  individual?: number;
  startup?: number;
  enterprise?: number;
} {
  return {
    individual: parseOptionalInt(process.env.ZEPHYR_LS_VARIANT_INDIVIDUAL),
    startup: parseOptionalInt(process.env.ZEPHYR_LS_VARIANT_STARTUP),
    enterprise: parseOptionalInt(process.env.ZEPHYR_LS_VARIANT_ENTERPRISE)
  };
}

function resolveFromText(raw: string): LicensePlan | null {
  const normalized = raw.toLowerCase();

  if (normalized.includes("enterprise")) return "enterprise";
  if (normalized.includes("startup")) return "startup";
  if (normalized.includes("individual")) return "individual";
  if (normalized.includes("team")) return "team";
  if (normalized.includes("pro")) return "pro";

  return null;
}

export function resolvePlan(input: PlanResolutionInput): LicensePlan {
  const byVariant = getEnvVariantMapping();

  if (input.variantId !== undefined) {
    if (byVariant.enterprise !== undefined && input.variantId === byVariant.enterprise) return "enterprise";
    if (byVariant.startup !== undefined && input.variantId === byVariant.startup) return "startup";
    if (byVariant.individual !== undefined && input.variantId === byVariant.individual) return "individual";
  }

  const variantNamePlan = input.variantName ? resolveFromText(input.variantName) : null;
  if (variantNamePlan) {
    return variantNamePlan;
  }

  const productNamePlan = input.productName ? resolveFromText(input.productName) : null;
  if (productNamePlan) {
    return productNamePlan;
  }

  // Safe default for paid license products when metadata is ambiguous.
  return "individual";
}

export function entitlementsForPlan(plan: LicensePlan | null): string[] {
  if (!plan) {
    return [];
  }

  switch (plan) {
    case "enterprise":
      return [
        "ui.components",
        "ui.page-templates",
        "cloud.assets",
        "cloud.audit",
        "mcp.actions",
        "team.workspaces",
        "priority.support"
      ];
    case "startup":
      return [
        "ui.components",
        "ui.page-templates",
        "cloud.assets",
        "cloud.audit",
        "mcp.actions"
      ];
    case "individual":
    case "pro":
      return [
        "ui.components",
        "ui.page-templates",
        "cloud.assets",
        "mcp.actions"
      ];
    case "team":
      return [
        "ui.components",
        "ui.page-templates",
        "cloud.assets",
        "cloud.audit",
        "mcp.actions",
        "team.workspaces"
      ];
    default:
      return [];
  }
}

function envCheckout(key: string): string | undefined {
  const raw = process.env[key]?.trim();
  return raw ? raw : undefined;
}

export function getBillingPlans(): BillingPlanDefinition[] {
  return [
    {
      id: "individual",
      label: "Individual",
      description: "For solo builders and personal projects.",
      checkoutUrl: envCheckout("ZEPHYR_LS_CHECKOUT_INDIVIDUAL")
    },
    {
      id: "startup",
      label: "Startup",
      description: "For small teams shipping products quickly.",
      recommended: true,
      checkoutUrl: envCheckout("ZEPHYR_LS_CHECKOUT_STARTUP")
    },
    {
      id: "enterprise",
      label: "Enterprise",
      description: "For larger teams with advanced support needs.",
      checkoutUrl: envCheckout("ZEPHYR_LS_CHECKOUT_ENTERPRISE")
    }
  ];
}
