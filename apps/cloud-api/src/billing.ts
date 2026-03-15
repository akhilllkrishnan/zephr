import { ensureCloudEnvLoaded } from "./env";

ensureCloudEnvLoaded();

export type LicensePlan = "free" | "pro" | "individual" | "startup" | "team" | "enterprise";

export interface PlanResolutionInput {
  variantId?: number;
  variantName?: string;
  productName?: string;
}

export interface BillingPlanDefinition {
  id: "templates";
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
  templates?: number;
} {
  return {
    templates: parseOptionalInt(process.env.ZEPHR_LS_VARIANT_TEMPLATES)
  };
}

export function resolvePlan(input: PlanResolutionInput): LicensePlan {
  const byVariant = getEnvVariantMapping();

  if (input.variantId !== undefined) {
    if (byVariant.templates !== undefined && input.variantId === byVariant.templates) return "pro";
  }

  // Any recognized paid product resolves to "pro"
  const text = [input.variantName, input.productName].filter(Boolean).join(" ").toLowerCase();
  if (text.includes("template") || text.includes("pro") || text.includes("zephr")) return "pro";

  // Safe default for paid license products when metadata is ambiguous.
  return "pro";
}

export function entitlementsForPlan(plan: LicensePlan | null): string[] {
  if (!plan || plan === "free") {
    return [];
  }

  // "pro" = templates entitlement only
  return ["ui.page-templates"];
}

function envCheckout(key: string): string | undefined {
  const raw = process.env[key]?.trim();
  return raw ? raw : undefined;
}

export function getBillingPlans(): BillingPlanDefinition[] {
  return [
    {
      id: "templates",
      label: "Templates",
      description: "Lifetime access to all 20 premium page templates.",
      recommended: true,
      checkoutUrl: envCheckout("ZEPHR_LS_CHECKOUT_TEMPLATES")
    }
  ];
}
