import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import {
  getComponentSpec,
  listComponents
} from "@zephrui/ai-registry";
import { generateAvatar, listAvatarStyles, searchAvatarStyles } from "@zephrui/avatars";
import { stylePackNames } from "@zephrui/core";
import { searchMaterialIcons, type MaterialIconStyle } from "@zephrui/icons-material";
import { LogoClient } from "@zephrui/logos";
import { listLogoCatalog, searchLogoCatalog } from "@zephrui/logos";
import { hasScope, requirePrincipalFromHeaders } from "./auth";
import { runUrlAudit, type UrlAuditRequest } from "./audit";
import { HttpError, getHeader, parseJsonBody } from "./http";
import { validateLicenseKey } from "./license";
import { entitlementsForPlan, getBillingPlans, resolvePlan, type LicensePlan } from "./billing";
import {
  activateLsLicenseKey,
  deactivateLsLicenseKey,
  getWebhookSecret,
  verifyWebhookSignature,
  type LsLicenseKeyAttributes,
  type LsOrderAttributes,
  type LsWebhookEvent
} from "./lemonsqueezy";
import { buildWebhookEventId, licenseStore } from "./licenseStore";
import { ensureCloudEnvLoaded } from "./env";
import { createRateLimiter } from "./rateLimit";

ensureCloudEnvLoaded();

interface SnippetRequest {
  componentId: string;
  variant?: string;
  prompt?: string;
}

interface TakedownRequest {
  domain: string;
  reason: string;
}

export interface AppRequest {
  method: string;
  url: URL;
  headers: Record<string, string | string[] | undefined>;
  bodyText: string;
  ip?: string;
}

export interface AppResponse {
  statusCode: number;
  payload: unknown;
  headers?: Record<string, string>;
}

const rateLimiter = createRateLimiter(120, 60_000);
const publicLicenseLimiter = createRateLimiter(30, 60_000);
const publicLicenseKeyLimiter = createRateLimiter(12, 60_000);
const publicActivationLimiter = createRateLimiter(20, 60_000);

const AUDIT_LOG_PATH = process.env.ZEPHR_AUDIT_LOG;
const logoClient = new LogoClient();

function json(statusCode: number, payload: unknown, headers?: Record<string, string>): AppResponse {
  return { statusCode, payload, headers };
}

function auditLog(
  principalKey: string,
  request: AppRequest,
  statusCode: number,
  metadata?: Record<string, unknown>
): void {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    principalKey,
    method: request.method,
    path: request.url.pathname,
    statusCode,
    ...metadata
  });

  console.log(entry);

  if (AUDIT_LOG_PATH) {
    try {
      const dir = path.dirname(AUDIT_LOG_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.appendFileSync(AUDIT_LOG_PATH, entry + "\n", "utf8");
    } catch {
      // Non-fatal: log file write errors should not crash the API.
    }
  }
}

function unauthorized(): AppResponse {
  return json(401, {
    error: "Missing or invalid API key. Set Authorization: Bearer <api_key>."
  });
}

function forbidden(scope: string): AppResponse {
  return json(403, {
    error: `Forbidden: this endpoint requires the '${scope}' scope.`
  });
}

function parseLimit(raw: string | null, fallback: number, max: number): number {
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, 1), max);
}

function parseIconStyle(raw: string | null): MaterialIconStyle | undefined {
  if (!raw) {
    return undefined;
  }

  if (raw === "filled" || raw === "outlined" || raw === "rounded" || raw === "sharp") {
    return raw;
  }

  return undefined;
}

function parseBooleanEnv(raw: string | undefined): boolean | null {
  if (!raw) {
    return null;
  }
  const normalized = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return null;
}

function shouldRequireWebhookSignature(): boolean {
  const explicit = parseBooleanEnv(process.env.ZEPHR_REQUIRE_WEBHOOK_SIGNATURE);
  if (explicit !== null) {
    return explicit;
  }
  return process.env.NODE_ENV === "production";
}

function normalizeLicenseStatus(raw: string | undefined): "active" | "invalid" | "revoked" | "expired" | "disabled" | "inactive" {
  const status = (raw ?? "").toLowerCase();
  if (status === "active") return "active";
  if (status === "expired") return "expired";
  if (status === "disabled") return "disabled";
  if (status === "inactive") return "inactive";
  if (status === "revoked") return "revoked";
  return "invalid";
}

function resolvePlanFromOrder(attrs: LsOrderAttributes): LicensePlan {
  return resolvePlan({
    variantId: attrs.first_order_item?.variant_id,
    variantName: attrs.first_order_item?.variant_name,
    productName: attrs.first_order_item?.product_name
  });
}

async function persistOrderCreated(attrs: LsOrderAttributes, resourceId?: string): Promise<LicensePlan> {
  const plan = resolvePlanFromOrder(attrs);
  const orderIds = new Set<number>();
  if (Number.isFinite(attrs.order_number)) {
    orderIds.add(attrs.order_number);
  }
  const parsedResourceId = Number.parseInt(resourceId ?? "", 10);
  if (Number.isFinite(parsedResourceId)) {
    orderIds.add(parsedResourceId);
  }

  for (const orderId of orderIds) {
    await licenseStore.upsertOrder({
      id: orderId,
      customerEmail: attrs.user_email,
      customerName: attrs.user_name,
      status: attrs.status,
      productId: attrs.first_order_item?.product_id,
      productName: attrs.first_order_item?.product_name,
      variantId: attrs.first_order_item?.variant_id,
      variantName: attrs.first_order_item?.variant_name,
      plan
    });
  }

  if (attrs.user_email) {
    await licenseStore.upsertCustomer({
      email: attrs.user_email,
      name: attrs.user_name,
      lastOrderId: attrs.order_number
    });
  }

  return plan;
}

async function persistLicenseFromWebhook(attrs: LsLicenseKeyAttributes): Promise<LicensePlan> {
  const linkedOrder = attrs.order_id ? await licenseStore.getOrder(attrs.order_id) : null;
  const plan = linkedOrder?.plan ?? resolvePlan({
    variantName: linkedOrder?.variantName,
    productName: linkedOrder?.productName
  });
  const normalizedStatus = normalizeLicenseStatus(attrs.status);
  const tier = normalizedStatus === "active" ? "pro" : "free";
  const message = normalizedStatus === "active"
    ? `License valid (${plan} plan).`
    : `License ${normalizedStatus}.`;

  await licenseStore.upsertLicense(attrs.key, {
    tier,
    plan: tier === "pro" ? plan : null,
    status: normalizedStatus,
    message,
    source: "lemonsqueezy",
    expiresAt: attrs.expires_at || undefined,
    activationLimit: attrs.activation_limit,
    activationUsage: attrs.activations_count,
    customerEmail: attrs.user_email,
    lemonSqueezy: {
      orderId: attrs.order_id,
      productId: attrs.product_id,
      storeId: attrs.store_id
    }
  });

  if (attrs.user_email) {
    await licenseStore.upsertCustomer({
      email: attrs.user_email,
      lastOrderId: attrs.order_id
    });
  }

  return plan;
}

async function handleV1(request: AppRequest): Promise<AppResponse> {
  if (request.method === "GET" && request.url.pathname === "/v1/licenses/plans") {
    const plans = getBillingPlans().map((plan) => ({
      ...plan,
      available: Boolean(plan.checkoutUrl)
    }));
    auditLog("public:license:plans", request, 200, {
      availablePlans: plans.filter((plan) => plan.available).length
    });
    return json(200, { plans });
  }

  if (request.method === "POST" && request.url.pathname === "/v1/webhooks/lemonsqueezy") {
    const signature = getHeader(request.headers, "x-signature");
    const secret = getWebhookSecret();
    const signatureRequired = shouldRequireWebhookSignature();

    if (signatureRequired && !secret) {
      auditLog("webhook:lemonsqueezy", request, 503);
      return json(503, {
        error: "Webhook signature verification is required but webhook secret is not configured."
      });
    }

    if (secret && !verifyWebhookSignature(request.bodyText, signature)) {
      auditLog("webhook:lemonsqueezy", request, 401);
      return json(401, { error: "Invalid webhook signature." });
    }

    let event: LsWebhookEvent;
    try {
      event = JSON.parse(request.bodyText) as LsWebhookEvent;
    } catch {
      return json(400, { error: "Malformed webhook payload." });
    }

    const eventName = event.meta?.event_name ?? "";
    const dataId = event.data?.id;
    const eventId = buildWebhookEventId(eventName, dataId, event.meta?.webhook_id);
    const isNewEvent = await licenseStore.recordWebhookEvent(eventId, eventName, dataId);
    if (!isNewEvent) {
      auditLog("webhook:lemonsqueezy", request, 200, { event: eventName, duplicate: true });
      return json(200, { received: true, duplicate: true, event: eventName });
    }

    console.log(`[webhook:lemonsqueezy] event=${eventName} id=${dataId}`);

    if (eventName === "order_created") {
      const attrs = event.data.attributes as LsOrderAttributes;
      const resolvedPlan = await persistOrderCreated(attrs, dataId);
      console.log(
        `[webhook:lemonsqueezy] order #${attrs.order_number} by ${attrs.user_email}` +
        ` status=${attrs.status} ${attrs.total} ${attrs.currency} plan=${resolvedPlan}`
      );
    }

    if (eventName === "license_key_created" || eventName === "license_key_updated") {
      const attrs = event.data.attributes as LsLicenseKeyAttributes;
      const resolvedPlan = await persistLicenseFromWebhook(attrs);
      console.log(
        `[webhook:lemonsqueezy] ${eventName} status=${attrs.status}` +
        ` limit=${attrs.activation_limit} product=${attrs.product_id} plan=${resolvedPlan}`
      );
    }

    if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
      const attrs = event.data.attributes as Partial<LsLicenseKeyAttributes> & { key?: string; user_email?: string };
      if (attrs.key) {
        await licenseStore.upsertLicense(attrs.key, {
          tier: "free",
          plan: null,
          status: "revoked",
          message: "Subscription cancelled.",
          source: "lemonsqueezy",
          customerEmail: attrs.user_email
        });
      }
    }

    auditLog("webhook:lemonsqueezy", request, 200, { event: eventName });
    return json(200, { received: true, event: eventName });
  }

  if (request.method === "POST" && request.url.pathname === "/v1/licenses/activate") {
    const ipKey = request.ip ?? "license-activate-public";
    if (publicActivationLimiter.isLimited(ipKey)) {
      const state = publicActivationLimiter.consume(ipKey);
      auditLog("public:license:activate", request, 429);
      return json(
        429,
        {
          error: "Too many activation attempts. Please retry in a minute.",
          resetAt: state.resetAt
        },
        {
          "X-RateLimit-Remaining": String(state.remaining),
          "X-RateLimit-Reset": state.resetAt
        }
      );
    }
    publicActivationLimiter.consume(ipKey);

    const body = parseJsonBody<{ licenseKey?: string; instanceName?: string }>(
      request.bodyText,
      request.headers,
      {
        requireObject: true,
        requireContentType: true
      }
    );
    if (!body.licenseKey || !body.instanceName) {
      return json(400, { error: "Missing required fields: licenseKey, instanceName" });
    }
    try {
      const result = await activateLsLicenseKey(body.licenseKey, body.instanceName);
      const existing = await licenseStore.getLicense(body.licenseKey);
      const plan = resolvePlan({
        variantId: result.meta?.variant_id,
        variantName: result.meta?.variant_name,
        productName: result.meta?.product_name
      });

      await licenseStore.upsertLicense(body.licenseKey, {
        tier: result.activated ? "pro" : existing?.tier ?? "free",
        plan: result.activated ? plan : existing?.plan ?? null,
        status: result.activated ? "active" : existing?.status ?? "invalid",
        message: result.activated
          ? `License activated (${plan} plan).`
          : result.error ?? existing?.message ?? "License activation failed.",
        source: "lemonsqueezy",
        activationLimit: result.license_key?.activation_limit,
        activationUsage: result.license_key?.activation_usage,
        customerEmail: existing?.customerEmail,
        lemonSqueezy: {
          licenseId: result.license_key?.id,
          orderId: result.meta?.order_id,
          productId: result.meta?.product_id,
          variantId: result.meta?.variant_id,
          variantName: result.meta?.variant_name,
          productName: result.meta?.product_name,
          storeId: result.meta?.store_id
        }
      });

      if (result.activated && result.instance) {
        await licenseStore.upsertActivation({
          id: result.instance.id,
          licenseKey: body.licenseKey,
          instanceName: result.instance.name || body.instanceName
        });
      }
      const activeInstances = (await licenseStore.listActiveActivations(body.licenseKey)).length;

      auditLog("public:license:activate", request, result.activated ? 200 : 422);
      return json(result.activated ? 200 : 422, {
        ...result,
        plan: result.activated ? plan : existing?.plan ?? null,
        tier: result.activated ? "pro" : existing?.tier ?? "free",
        entitlements: entitlementsForPlan(result.activated ? plan : existing?.plan ?? null),
        activeInstances
      });
    } catch (err) {
      console.error("[license/activate]", err);
      return json(503, { error: "License activation service unavailable." });
    }
  }

  if (request.method === "POST" && request.url.pathname === "/v1/licenses/deactivate") {
    const ipKey = request.ip ?? "license-deactivate-public";
    if (publicActivationLimiter.isLimited(ipKey)) {
      const state = publicActivationLimiter.consume(ipKey);
      auditLog("public:license:deactivate", request, 429);
      return json(
        429,
        {
          error: "Too many deactivation attempts. Please retry in a minute.",
          resetAt: state.resetAt
        },
        {
          "X-RateLimit-Remaining": String(state.remaining),
          "X-RateLimit-Reset": state.resetAt
        }
      );
    }
    publicActivationLimiter.consume(ipKey);

    const body = parseJsonBody<{ licenseKey?: string; instanceId?: string }>(
      request.bodyText,
      request.headers,
      {
        requireObject: true,
        requireContentType: true
      }
    );
    if (!body.licenseKey || !body.instanceId) {
      return json(400, { error: "Missing required fields: licenseKey, instanceId" });
    }
    try {
      const result = await deactivateLsLicenseKey(body.licenseKey, body.instanceId);
      const existing = await licenseStore.getLicense(body.licenseKey);
      if (result.deactivated) {
        await licenseStore.deactivateActivation(body.instanceId, body.licenseKey);
      }
      const activeInstances = (await licenseStore.listActiveActivations(body.licenseKey)).length;

      auditLog("public:license:deactivate", request, result.deactivated ? 200 : 422);
      return json(result.deactivated ? 200 : 422, {
        ...result,
        plan: existing?.plan ?? null,
        tier: existing?.tier ?? "free",
        entitlements: entitlementsForPlan(existing?.plan ?? null),
        activeInstances
      });
    } catch (err) {
      console.error("[license/deactivate]", err);
      return json(503, { error: "License deactivation service unavailable." });
    }
  }

  if (request.method === "POST" && request.url.pathname === "/v1/licenses/validate") {
    const body = parseJsonBody<{ licenseKey?: string }>(
      request.bodyText,
      request.headers,
      {
        requireObject: true,
        requireContentType: true
      }
    );
    if (!body.licenseKey) {
      auditLog("public:license", request, 400);
      return json(400, { error: "Missing required field: licenseKey" });
    }

    const ipKey = request.ip ?? "license-public";
    const licenseScopeKey = `license:${body.licenseKey.trim().toLowerCase()}`;

    if (publicLicenseLimiter.isLimited(ipKey) || publicLicenseKeyLimiter.isLimited(licenseScopeKey)) {
      const ipState = publicLicenseLimiter.consume(ipKey);
      const keyState = publicLicenseKeyLimiter.consume(licenseScopeKey);
      const remaining = Math.min(ipState.remaining, keyState.remaining);
      const resetAt = ipState.resetAt > keyState.resetAt ? ipState.resetAt : keyState.resetAt;
      auditLog("public:license", request, 429);
      return json(
        429,
        {
          error: "Too many validation attempts. Please wait before retrying.",
          resetAt
        },
        {
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": resetAt
        }
      );
    }

    const ipState = publicLicenseLimiter.consume(ipKey);
    const keyState = publicLicenseKeyLimiter.consume(licenseScopeKey);
    const rateHeaders = {
      "X-RateLimit-Remaining": String(Math.min(ipState.remaining, keyState.remaining)),
      "X-RateLimit-Reset": ipState.resetAt > keyState.resetAt ? ipState.resetAt : keyState.resetAt
    };

    const validation = await validateLicenseKey(body.licenseKey);
    auditLog("public:license", request, 200, {
      valid: validation.valid,
      tier: validation.tier,
      status: validation.status,
      source: validation.source
    });
    return json(200, validation, rateHeaders);
  }

  const principal = requirePrincipalFromHeaders(request.headers);
  if (!principal) {
    return unauthorized();
  }

  if (rateLimiter.isLimited(principal.key)) {
    const state = rateLimiter.consume(principal.key);
    auditLog(principal.key, request, 429);
    return json(
      429,
      {
        error: "Rate limit exceeded",
        resetAt: state.resetAt
      },
      {
        "X-RateLimit-Remaining": String(state.remaining),
        "X-RateLimit-Reset": state.resetAt
      }
    );
  }

  const limitState = rateLimiter.consume(principal.key);
  const rateHeaders = {
    "X-RateLimit-Remaining": String(limitState.remaining),
    "X-RateLimit-Reset": limitState.resetAt
  };

  if (request.method === "GET" && request.url.pathname === "/v1/me") {
    auditLog(principal.key, request, 200);
    return json(200, { key: principal.key, scopes: principal.scopes }, rateHeaders);
  }

  if (request.method === "GET" && request.url.pathname === "/v1/components") {
    auditLog(principal.key, request, 200);
    return json(200, listComponents(), rateHeaders);
  }

  if (request.method === "GET" && request.url.pathname === "/v1/themes") {
    auditLog(principal.key, request, 200);
    return json(200, stylePackNames, rateHeaders);
  }

  if (request.method === "POST" && request.url.pathname === "/v1/audit/url") {
    if (!hasScope(principal, "assets:read")) {
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return forbidden("assets:read");
    }

    const body = parseJsonBody<UrlAuditRequest>(request.bodyText, request.headers, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.url) {
      auditLog(principal.key, request, 400);
      return json(400, { error: "Missing required field: url" }, rateHeaders);
    }

    try {
      const report = await runUrlAudit(body);
      auditLog(principal.key, request, 200, {
        targetUrl: body.url,
        score: report.score,
        issues: report.issues.length
      });
      return json(200, report, rateHeaders);
    } catch (error) {
      auditLog(principal.key, request, 502, { targetUrl: body.url });
      return json(
        502,
        {
          error: error instanceof Error ? error.message : "Audit failed"
        },
        rateHeaders
      );
    }
  }

  if (request.method === "GET" && request.url.pathname === "/v1/icons") {
    if (!hasScope(principal, "assets:read")) {
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return forbidden("assets:read");
    }

    const query = (request.url.searchParams.get("q") ?? "").trim();
    const limit = parseLimit(request.url.searchParams.get("limit"), 120, 240);
    const style = parseIconStyle(request.url.searchParams.get("style"));

    auditLog(principal.key, request, 200, { query, limit, style });
    return json(
      200,
      {
        query,
        limit,
        source: "cloud",
        items: searchMaterialIcons(query, { limit, style })
      },
      rateHeaders
    );
  }

  if (request.method === "GET" && request.url.pathname === "/v1/avatars/styles") {
    if (!hasScope(principal, "assets:read")) {
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return forbidden("assets:read");
    }

    const query = (request.url.searchParams.get("q") ?? "").trim();
    const limit = parseLimit(request.url.searchParams.get("limit"), 24, 120);
    const items = query ? searchAvatarStyles(query, limit) : listAvatarStyles().slice(0, limit);

    auditLog(principal.key, request, 200, { query, limit });
    return json(
      200,
      {
        query,
        limit,
        source: "cloud",
        items
      },
      rateHeaders
    );
  }

  if (request.method === "GET" && request.url.pathname === "/v1/logos") {
    if (!hasScope(principal, "assets:read")) {
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return forbidden("assets:read");
    }

    const query = (request.url.searchParams.get("q") ?? "").trim();
    const limit = parseLimit(request.url.searchParams.get("limit"), 120, 240);
    const items = query ? searchLogoCatalog(query, limit) : listLogoCatalog().slice(0, limit);

    auditLog(principal.key, request, 200, { query, limit });
    return json(
      200,
      {
        query,
        limit,
        source: "cloud",
        items
      },
      rateHeaders
    );
  }

  if (request.method === "GET" && request.url.pathname.startsWith("/v1/logos/")) {
    if (!hasScope(principal, "assets:read")) {
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return forbidden("assets:read");
    }

    const domain = decodeURIComponent(request.url.pathname.replace("/v1/logos/", "")).trim();
    if (!domain) {
      auditLog(principal.key, request, 400);
      return json(400, { error: "Domain path parameter is required." }, rateHeaders);
    }

    if (logoClient.isDenied(domain)) {
      auditLog(principal.key, request, 451, { domain });
      return json(451, { error: "Domain is blocked by compliance policy." }, rateHeaders);
    }

    try {
      const result = await logoClient.resolve(domain);
      auditLog(principal.key, request, 200, { domain, fallback: result.fallback });
      return json(200, result, rateHeaders);
    } catch (error) {
      auditLog(principal.key, request, 500, { domain });
      return json(
        500,
        { error: error instanceof Error ? error.message : "Logo resolution failed." },
        rateHeaders
      );
    }
  }

  if (request.method === "POST" && request.url.pathname === "/v1/avatars") {
    if (!hasScope(principal, "assets:write")) {
      auditLog(principal.key, request, 403, { scope: "assets:write" });
      return forbidden("assets:write");
    }

    const body = parseJsonBody<{ name?: string; seed?: string; size?: number }>(
      request.bodyText,
      request.headers,
      {
        requireObject: true,
        requireContentType: true
      }
    );
    if (!body.name) {
      auditLog(principal.key, request, 400);
      return json(400, { error: "Missing required field: name" }, rateHeaders);
    }

    const avatar = generateAvatar({
      name: body.name,
      seed: body.seed,
      size: body.size
    });

    auditLog(principal.key, request, 200, { name: body.name });
    return json(200, avatar, rateHeaders);
  }

  if (request.method === "POST" && request.url.pathname === "/v1/snippets") {
    if (!hasScope(principal, "assets:write")) {
      auditLog(principal.key, request, 403, { scope: "assets:write" });
      return forbidden("assets:write");
    }

    const body = parseJsonBody<SnippetRequest>(request.bodyText, request.headers, {
      requireObject: true,
      requireContentType: true
    });

    if (!body.componentId) {
      auditLog(principal.key, request, 400);
      return json(400, { error: "Missing required field: componentId" }, rateHeaders);
    }

    const spec = getComponentSpec(body.componentId);
    if (!spec) {
      auditLog(principal.key, request, 404, { componentId: body.componentId });
      return json(404, { error: `Component '${body.componentId}' not found.` }, rateHeaders);
    }

    const sample = spec.usageExamples?.[0] ?? `// Example unavailable for ${spec.name}`;
    auditLog(principal.key, request, 200, { componentId: spec.id });
    return json(
      200,
      {
        componentId: spec.id,
        code: sample,
        metadata: {
          variant: body.variant ?? "default",
          prompt: body.prompt ?? ""
        }
      },
      rateHeaders
    );
  }

  if (request.method === "POST" && request.url.pathname === "/v1/compliance/takedown") {
    if (!hasScope(principal, "compliance:write")) {
      auditLog(principal.key, request, 403, { scope: "compliance:write" });
      return forbidden("compliance:write");
    }

    const body = parseJsonBody<TakedownRequest>(request.bodyText, request.headers, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.domain || !body.reason) {
      auditLog(principal.key, request, 400);
      return json(400, { error: "Fields 'domain' and 'reason' are required." }, rateHeaders);
    }

    const record = logoClient.requestTakedown(body.domain, body.reason);
    auditLog(principal.key, request, 200, { domain: record.domain });
    return json(200, { status: "blocked", record }, rateHeaders);
  }

  if (request.method === "GET" && request.url.pathname === "/v1/providers/health") {
    const status = await logoClient.providerHealth();
    auditLog(principal.key, request, 200);
    return json(200, status, rateHeaders);
  }

  auditLog(principal.key, request, 404);
  return json(404, { error: "Endpoint not found" }, rateHeaders);
}

export async function handleAppRequest(request: AppRequest): Promise<AppResponse> {
  try {
    if (request.method === "OPTIONS") {
      return json(200, { ok: true });
    }

    if (request.method === "GET" && request.url.pathname === "/health") {
      return json(200, {
        status: "ok",
        service: "zephr-cloud-api",
        now: new Date().toISOString(),
        integrations: {
          lemonSqueezy: {
            apiKeyConfigured: Boolean(process.env.LEMON_SQUEEZY_API_KEY?.trim()),
            webhookSecretConfigured: Boolean(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET?.trim()),
            checkoutLinksConfigured: getBillingPlans().reduce<Record<string, boolean>>((acc, plan) => {
              acc[plan.id] = Boolean(plan.checkoutUrl);
              return acc;
            }, {})
          },
          licensing: {
            backend: licenseStore.getBackend(),
            storePath: licenseStore.getFilePath(),
            supabaseUrl: licenseStore.getSupabaseUrl(),
            localFallbackEnabled:
              parseBooleanEnv(process.env.ZEPHR_ALLOW_LOCAL_LICENSE_FALLBACK) ??
              (process.env.NODE_ENV !== "production")
          }
        }
      });
    }

    if (request.url.pathname.startsWith("/v1")) {
      return await handleV1(request);
    }

    return json(404, { error: "Not found" });
  } catch (error) {
    if (error instanceof HttpError) {
      return json(error.statusCode, {
        error: error.message,
        code: error.code,
        details: error.details
      });
    }

    console.error("[cloud-api] unhandled error", error);
    return json(500, { error: "Internal server error." });
  }
}
