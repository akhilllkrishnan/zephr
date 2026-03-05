import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import {
  getComponentSpec,
  listComponents
} from "@zephyr/ai-registry";
import { generateAvatar, listAvatarStyles, searchAvatarStyles } from "@zephyr/avatars";
import { stylePackNames } from "@zephyr/core";
import { searchMaterialIcons, type MaterialIconStyle } from "@zephyr/icons-material";
import { LogoClient } from "@zephyr/logos";
import { listLogoCatalog, searchLogoCatalog } from "@zephyr/logos";
import { requirePrincipal, hasScope } from "./auth";
import { runUrlAudit, type UrlAuditRequest } from "./audit";
import { HttpError, readJsonBody, sendJson } from "./http";
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

interface SnippetRequest {
  componentId: string;
  variant?: string;
  prompt?: string;
}

ensureCloudEnvLoaded();

interface TakedownRequest {
  domain: string;
  reason: string;
}

// ---------------------------------------------------------------------------
// Rate limiters
// ---------------------------------------------------------------------------

const rateLimiter = createRateLimiter(120, 60_000);
const publicLicenseLimiter = createRateLimiter(30, 60_000);
const publicLicenseKeyLimiter = createRateLimiter(12, 60_000);
const publicActivationLimiter = createRateLimiter(20, 60_000);

// ---------------------------------------------------------------------------
// Audit logger
// ---------------------------------------------------------------------------

const AUDIT_LOG_PATH = process.env.ZEPHYR_AUDIT_LOG;

function auditLog(
  principalKey: string,
  request: IncomingMessage,
  statusCode: number,
  metadata?: Record<string, unknown>
): void {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    principalKey,
    method: request.method,
    path: request.url,
    statusCode,
    ...metadata
  });

  // Always write to stdout
  console.log(entry);

  // Also append to a log file if configured
  if (AUDIT_LOG_PATH) {
    try {
      const dir = path.dirname(AUDIT_LOG_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.appendFileSync(AUDIT_LOG_PATH, entry + "\n", "utf8");
    } catch {
      // Non-fatal: log file write errors should not crash the API
    }
  }
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

const logoClient = new LogoClient();

function unauthorized(response: ServerResponse): void {
  sendJson(response, 401, {
    error: "Missing or invalid API key. Set Authorization: Bearer <api_key>."
  });
}

function forbidden(response: ServerResponse, scope: string): void {
  sendJson(response, 403, {
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
  const explicit = parseBooleanEnv(process.env.ZEPHYR_REQUIRE_WEBHOOK_SIGNATURE);
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

function persistOrderCreated(attrs: LsOrderAttributes, resourceId?: string): LicensePlan {
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
    licenseStore.upsertOrder({
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
    licenseStore.upsertCustomer({
      email: attrs.user_email,
      name: attrs.user_name,
      lastOrderId: attrs.order_number
    });
  }

  return plan;
}

function persistLicenseFromWebhook(attrs: LsLicenseKeyAttributes): LicensePlan {
  const linkedOrder = attrs.order_id ? licenseStore.getOrder(attrs.order_id) : null;
  const plan = linkedOrder?.plan ?? resolvePlan({
    variantName: linkedOrder?.variantName,
    productName: linkedOrder?.productName
  });
  const normalizedStatus = normalizeLicenseStatus(attrs.status);
  const tier = normalizedStatus === "active" ? "pro" : "free";
  const message = normalizedStatus === "active"
    ? `License valid (${plan} plan).`
    : `License ${normalizedStatus}.`;

  const expiresAt = attrs.expires_at || undefined;
  const activationLimit = attrs.activation_limit;
  const activationUsage = attrs.activations_count;

  licenseStore.upsertLicense(attrs.key, {
    tier,
    plan: tier === "pro" ? plan : null,
    status: normalizedStatus,
    message,
    source: "lemonsqueezy",
    expiresAt,
    activationLimit,
    activationUsage,
    customerEmail: attrs.user_email,
    lemonSqueezy: {
      orderId: attrs.order_id,
      productId: attrs.product_id,
      storeId: attrs.store_id
    }
  });

  if (attrs.user_email) {
    licenseStore.upsertCustomer({
      email: attrs.user_email,
      lastOrderId: attrs.order_id
    });
  }

  return plan;
}

// ---------------------------------------------------------------------------
// Auth-protected route handler
// ---------------------------------------------------------------------------

async function handleV1(request: IncomingMessage, response: ServerResponse, url: URL): Promise<void> {
  // --- Public endpoint: billing plans + checkout links ---
  if (request.method === "GET" && url.pathname === "/v1/licenses/plans") {
    const plans = getBillingPlans().map((plan) => ({
      ...plan,
      available: Boolean(plan.checkoutUrl)
    }));
    sendJson(response, 200, { plans });
    auditLog("public:license:plans", request, 200, {
      availablePlans: plans.filter((plan) => plan.available).length
    });
    return;
  }

  // --- Public endpoint: Lemon Squeezy webhook (no Bearer, verified by HMAC) ---
  if (request.method === "POST" && url.pathname === "/v1/webhooks/lemonsqueezy") {
    const rawChunks: Uint8Array[] = [];
    for await (const chunk of request) {
      rawChunks.push(typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk);
    }
    const rawBody = Buffer.concat(rawChunks).toString("utf8");
    const signature = String(request.headers["x-signature"] ?? "");

    const secret = getWebhookSecret();
    const signatureRequired = shouldRequireWebhookSignature();

    if (signatureRequired && !secret) {
      sendJson(response, 503, {
        error: "Webhook signature verification is required but webhook secret is not configured."
      });
      auditLog("webhook:lemonsqueezy", request, 503);
      return;
    }

    if (secret && !verifyWebhookSignature(rawBody, signature)) {
      sendJson(response, 401, { error: "Invalid webhook signature." });
      auditLog("webhook:lemonsqueezy", request, 401);
      return;
    }

    let event: LsWebhookEvent;
    try {
      event = JSON.parse(rawBody) as LsWebhookEvent;
    } catch {
      sendJson(response, 400, { error: "Malformed webhook payload." });
      return;
    }

    const eventName = event.meta?.event_name ?? "";
    const dataId = event.data?.id;
    const eventId = buildWebhookEventId(eventName, dataId, event.meta?.webhook_id);
    const isNewEvent = licenseStore.recordWebhookEvent(eventId, eventName, dataId);
    if (!isNewEvent) {
      sendJson(response, 200, { received: true, duplicate: true, event: eventName });
      auditLog("webhook:lemonsqueezy", request, 200, { event: eventName, duplicate: true });
      return;
    }

    console.log(`[webhook:lemonsqueezy] event=${eventName} id=${dataId}`);

    if (eventName === "order_created") {
      const attrs = event.data.attributes as LsOrderAttributes;
      const resolvedPlan = persistOrderCreated(attrs, dataId);
      console.log(
        `[webhook:lemonsqueezy] order #${attrs.order_number} by ${attrs.user_email}` +
        ` status=${attrs.status} ${attrs.total} ${attrs.currency} plan=${resolvedPlan}`
      );
    }

    if (eventName === "license_key_created" || eventName === "license_key_updated") {
      const attrs = event.data.attributes as LsLicenseKeyAttributes;
      const resolvedPlan = persistLicenseFromWebhook(attrs);
      console.log(
        `[webhook:lemonsqueezy] ${eventName} status=${attrs.status}` +
        ` limit=${attrs.activation_limit} product=${attrs.product_id} plan=${resolvedPlan}`
      );
    }

    if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
      const attrs = event.data.attributes as Partial<LsLicenseKeyAttributes> & { key?: string; user_email?: string };
      if (attrs.key) {
        licenseStore.upsertLicense(attrs.key, {
          tier: "free",
          plan: null,
          status: "revoked",
          message: "Subscription cancelled.",
          source: "lemonsqueezy",
          customerEmail: attrs.user_email
        });
      }
    }

    sendJson(response, 200, { received: true, event: eventName });
    auditLog("webhook:lemonsqueezy", request, 200, { event: eventName });
    return;
  }

  // --- Public endpoint: license activate (no Bearer required) ---
  if (request.method === "POST" && url.pathname === "/v1/licenses/activate") {
    const ipKey = request.socket.remoteAddress ?? "license-activate-public";
    if (publicActivationLimiter.isLimited(ipKey)) {
      const state = publicActivationLimiter.consume(ipKey);
      sendJson(
        response,
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
      auditLog("public:license:activate", request, 429);
      return;
    }
    publicActivationLimiter.consume(ipKey);

    const body = await readJsonBody<{ licenseKey?: string; instanceName?: string }>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.licenseKey || !body.instanceName) {
      sendJson(response, 400, { error: "Missing required fields: licenseKey, instanceName" });
      return;
    }
    try {
      const result = await activateLsLicenseKey(body.licenseKey, body.instanceName);

      const existing = licenseStore.getLicense(body.licenseKey);
      const plan = resolvePlan({
        variantId: result.meta?.variant_id,
        variantName: result.meta?.variant_name,
        productName: result.meta?.product_name
      });

      licenseStore.upsertLicense(body.licenseKey, {
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
        licenseStore.upsertActivation({
          id: result.instance.id,
          licenseKey: body.licenseKey,
          instanceName: result.instance.name || body.instanceName
        });
      }

      sendJson(response, result.activated ? 200 : 422, {
        ...result,
        plan: result.activated ? plan : existing?.plan ?? null,
        tier: result.activated ? "pro" : existing?.tier ?? "free",
        entitlements: entitlementsForPlan(result.activated ? plan : existing?.plan ?? null),
        activeInstances: licenseStore.listActiveActivations(body.licenseKey).length
      });
      auditLog("public:license:activate", request, result.activated ? 200 : 422);
    } catch (err) {
      console.error("[license/activate]", err);
      sendJson(response, 503, { error: "License activation service unavailable." });
    }
    return;
  }

  // --- Public endpoint: license deactivate (no Bearer required) ---
  if (request.method === "POST" && url.pathname === "/v1/licenses/deactivate") {
    const ipKey = request.socket.remoteAddress ?? "license-deactivate-public";
    if (publicActivationLimiter.isLimited(ipKey)) {
      const state = publicActivationLimiter.consume(ipKey);
      sendJson(
        response,
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
      auditLog("public:license:deactivate", request, 429);
      return;
    }
    publicActivationLimiter.consume(ipKey);

    const body = await readJsonBody<{ licenseKey?: string; instanceId?: string }>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.licenseKey || !body.instanceId) {
      sendJson(response, 400, { error: "Missing required fields: licenseKey, instanceId" });
      return;
    }
    try {
      const result = await deactivateLsLicenseKey(body.licenseKey, body.instanceId);
      const existing = licenseStore.getLicense(body.licenseKey);
      if (result.deactivated) {
        licenseStore.deactivateActivation(body.instanceId, body.licenseKey);
      }

      sendJson(response, result.deactivated ? 200 : 422, {
        ...result,
        plan: existing?.plan ?? null,
        tier: existing?.tier ?? "free",
        entitlements: entitlementsForPlan(existing?.plan ?? null),
        activeInstances: licenseStore.listActiveActivations(body.licenseKey).length
      });
      auditLog("public:license:deactivate", request, result.deactivated ? 200 : 422);
    } catch (err) {
      console.error("[license/deactivate]", err);
      sendJson(response, 503, { error: "License deactivation service unavailable." });
    }
    return;
  }

  // --- Public endpoint: license validation (no Bearer required) ---
  if (request.method === "POST" && url.pathname === "/v1/licenses/validate") {
    const body = await readJsonBody<{ licenseKey?: string }>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.licenseKey) {
      sendJson(response, 400, { error: "Missing required field: licenseKey" });
      auditLog("public:license", request, 400);
      return;
    }

    const ipKey = request.socket.remoteAddress ?? "license-public";
    const licenseScopeKey = `license:${body.licenseKey.trim().toLowerCase()}`;

    if (publicLicenseLimiter.isLimited(ipKey) || publicLicenseKeyLimiter.isLimited(licenseScopeKey)) {
      const ipState = publicLicenseLimiter.consume(ipKey);
      const keyState = publicLicenseKeyLimiter.consume(licenseScopeKey);
      const remaining = Math.min(ipState.remaining, keyState.remaining);
      const resetAt = ipState.resetAt > keyState.resetAt ? ipState.resetAt : keyState.resetAt;
      sendJson(
        response,
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
      auditLog("public:license", request, 429);
      return;
    }

    const ipState = publicLicenseLimiter.consume(ipKey);
    const keyState = publicLicenseKeyLimiter.consume(licenseScopeKey);
    const rateHeaders = {
      "X-RateLimit-Remaining": String(Math.min(ipState.remaining, keyState.remaining)),
      "X-RateLimit-Reset": ipState.resetAt > keyState.resetAt ? ipState.resetAt : keyState.resetAt
    };

    const validation = await validateLicenseKey(body.licenseKey);
    sendJson(response, 200, validation, rateHeaders);
    auditLog("public:license", request, 200, {
      valid: validation.valid,
      tier: validation.tier,
      status: validation.status,
      source: validation.source
    });
    return;
  }

  // --- All other /v1/* routes require Bearer auth ---
  const principal = requirePrincipal(request);
  if (!principal) {
    unauthorized(response);
    return;
  }

  if (rateLimiter.isLimited(principal.key)) {
    const state = rateLimiter.consume(principal.key);
    sendJson(
      response,
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
    auditLog(principal.key, request, 429);
    return;
  }

  const limitState = rateLimiter.consume(principal.key);
  const rateHeaders = {
    "X-RateLimit-Remaining": String(limitState.remaining),
    "X-RateLimit-Reset": limitState.resetAt
  };

  // --- GET /v1/me — principal introspection ---
  if (request.method === "GET" && url.pathname === "/v1/me") {
    sendJson(response, 200, { key: principal.key, scopes: principal.scopes }, rateHeaders);
    auditLog(principal.key, request, 200);
    return;
  }

  // --- GET /v1/components ---
  if (request.method === "GET" && url.pathname === "/v1/components") {
    sendJson(response, 200, listComponents(), rateHeaders);
    auditLog(principal.key, request, 200);
    return;
  }

  // --- GET /v1/themes ---
  if (request.method === "GET" && url.pathname === "/v1/themes") {
    sendJson(response, 200, stylePackNames, rateHeaders);
    auditLog(principal.key, request, 200);
    return;
  }

  // --- POST /v1/audit/url (requires assets:read) ---
  if (request.method === "POST" && url.pathname === "/v1/audit/url") {
    if (!hasScope(principal, "assets:read")) {
      forbidden(response, "assets:read");
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return;
    }

    const body = await readJsonBody<UrlAuditRequest>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.url) {
      sendJson(response, 400, { error: "Missing required field: url" }, rateHeaders);
      auditLog(principal.key, request, 400);
      return;
    }

    try {
      const report = await runUrlAudit(body);
      sendJson(response, 200, report, rateHeaders);
      auditLog(principal.key, request, 200, {
        targetUrl: body.url,
        score: report.score,
        issues: report.issues.length
      });
    } catch (error) {
      sendJson(
        response,
        502,
        {
          error: error instanceof Error ? error.message : "Audit failed"
        },
        rateHeaders
      );
      auditLog(principal.key, request, 502, { targetUrl: body.url });
    }
    return;
  }

  // --- GET /v1/icons (requires assets:read) ---
  if (request.method === "GET" && url.pathname === "/v1/icons") {
    if (!hasScope(principal, "assets:read")) {
      forbidden(response, "assets:read");
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return;
    }

    const query = (url.searchParams.get("q") ?? "").trim();
    const limit = parseLimit(url.searchParams.get("limit"), 120, 240);
    const style = parseIconStyle(url.searchParams.get("style"));

    sendJson(
      response,
      200,
      {
        query,
        limit,
        source: "cloud",
        items: searchMaterialIcons(query, { limit, style })
      },
      rateHeaders
    );
    auditLog(principal.key, request, 200, { query, limit, style });
    return;
  }

  // --- GET /v1/avatars/styles (requires assets:read) ---
  if (request.method === "GET" && url.pathname === "/v1/avatars/styles") {
    if (!hasScope(principal, "assets:read")) {
      forbidden(response, "assets:read");
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return;
    }

    const query = (url.searchParams.get("q") ?? "").trim();
    const limit = parseLimit(url.searchParams.get("limit"), 24, 120);
    const items = query ? searchAvatarStyles(query, limit) : listAvatarStyles().slice(0, limit);

    sendJson(
      response,
      200,
      {
        query,
        limit,
        source: "cloud",
        items
      },
      rateHeaders
    );
    auditLog(principal.key, request, 200, { query, limit });
    return;
  }

  // --- GET /v1/logos (requires assets:read) ---
  if (request.method === "GET" && url.pathname === "/v1/logos") {
    if (!hasScope(principal, "assets:read")) {
      forbidden(response, "assets:read");
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return;
    }

    const query = (url.searchParams.get("q") ?? "").trim();
    const limit = parseLimit(url.searchParams.get("limit"), 120, 240);
    const items = query ? searchLogoCatalog(query, limit) : listLogoCatalog().slice(0, limit);

    sendJson(
      response,
      200,
      {
        query,
        limit,
        source: "cloud",
        items
      },
      rateHeaders
    );
    auditLog(principal.key, request, 200, { query, limit });
    return;
  }

  // --- GET /v1/logos/:domain (requires assets:read) ---
  if (request.method === "GET" && url.pathname.startsWith("/v1/logos/")) {
    if (!hasScope(principal, "assets:read")) {
      forbidden(response, "assets:read");
      auditLog(principal.key, request, 403, { scope: "assets:read" });
      return;
    }

    const domain = decodeURIComponent(url.pathname.replace("/v1/logos/", "")).trim();

    if (!domain) {
      sendJson(response, 400, { error: "Domain path parameter is required." }, rateHeaders);
      auditLog(principal.key, request, 400);
      return;
    }

    if (logoClient.isDenied(domain)) {
      sendJson(response, 451, { error: "Domain is blocked by compliance policy." }, rateHeaders);
      auditLog(principal.key, request, 451, { domain });
      return;
    }

    try {
      const result = await logoClient.resolve(domain);
      sendJson(response, 200, result, rateHeaders);
      auditLog(principal.key, request, 200, { domain, fallback: result.fallback });
    } catch (error) {
      sendJson(response, 500, { error: error instanceof Error ? error.message : "Logo resolution failed." }, rateHeaders);
      auditLog(principal.key, request, 500, { domain });
    }
    return;
  }

  // --- POST /v1/avatars (requires assets:write) ---
  if (request.method === "POST" && url.pathname === "/v1/avatars") {
    if (!hasScope(principal, "assets:write")) {
      forbidden(response, "assets:write");
      auditLog(principal.key, request, 403, { scope: "assets:write" });
      return;
    }

    const body = await readJsonBody<{ name?: string; seed?: string; size?: number }>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.name) {
      sendJson(response, 400, { error: "Missing required field: name" }, rateHeaders);
      auditLog(principal.key, request, 400);
      return;
    }

    const avatar = generateAvatar({
      name: body.name,
      seed: body.seed,
      size: body.size
    });

    sendJson(response, 200, avatar, rateHeaders);
    auditLog(principal.key, request, 200, { name: body.name });
    return;
  }

  // --- POST /v1/snippets (requires assets:write) ---
  if (request.method === "POST" && url.pathname === "/v1/snippets") {
    if (!hasScope(principal, "assets:write")) {
      forbidden(response, "assets:write");
      auditLog(principal.key, request, 403, { scope: "assets:write" });
      return;
    }

    const body = await readJsonBody<SnippetRequest>(request, {
      requireObject: true,
      requireContentType: true
    });

    if (!body.componentId) {
      sendJson(response, 400, { error: "Missing required field: componentId" }, rateHeaders);
      auditLog(principal.key, request, 400);
      return;
    }

    const spec = getComponentSpec(body.componentId);
    if (!spec) {
      sendJson(response, 404, { error: `Component '${body.componentId}' not found.` }, rateHeaders);
      auditLog(principal.key, request, 404, { componentId: body.componentId });
      return;
    }

    const sample = spec.usageExamples?.[0] ?? `// Example unavailable for ${spec.name}`;
    sendJson(
      response,
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
    auditLog(principal.key, request, 200, { componentId: spec.id });
    return;
  }

  // --- POST /v1/compliance/takedown (requires compliance:write) ---
  if (request.method === "POST" && url.pathname === "/v1/compliance/takedown") {
    if (!hasScope(principal, "compliance:write")) {
      forbidden(response, "compliance:write");
      auditLog(principal.key, request, 403, { scope: "compliance:write" });
      return;
    }

    const body = await readJsonBody<TakedownRequest>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.domain || !body.reason) {
      sendJson(response, 400, { error: "Fields 'domain' and 'reason' are required." }, rateHeaders);
      auditLog(principal.key, request, 400);
      return;
    }

    const record = logoClient.requestTakedown(body.domain, body.reason);
    sendJson(response, 200, { status: "blocked", record }, rateHeaders);
    auditLog(principal.key, request, 200, { domain: record.domain });
    return;
  }

  // --- GET /v1/providers/health ---
  if (request.method === "GET" && url.pathname === "/v1/providers/health") {
    const status = await logoClient.providerHealth();
    sendJson(response, 200, status, rateHeaders);
    auditLog(principal.key, request, 200);
    return;
  }

  sendJson(response, 404, { error: "Endpoint not found" }, rateHeaders);
  auditLog(principal.key, request, 404);
}

// ---------------------------------------------------------------------------
// Server bootstrap
// ---------------------------------------------------------------------------

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

    if (request.method === "OPTIONS") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, {
        status: "ok",
        service: "zephyr-cloud-api",
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
            storePath: licenseStore.getFilePath(),
            localFallbackEnabled:
              parseBooleanEnv(process.env.ZEPHYR_ALLOW_LOCAL_LICENSE_FALLBACK) ??
              (process.env.NODE_ENV !== "production")
          }
        }
      });
      return;
    }

    if (url.pathname.startsWith("/v1")) {
      await handleV1(request, response, url);
      return;
    }

    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    if (error instanceof HttpError) {
      sendJson(
        response,
        error.statusCode,
        {
          error: error.message,
          code: error.code,
          details: error.details
        }
      );
      return;
    }

    console.error("[cloud-api] unhandled error", error);
    sendJson(response, 500, { error: "Internal server error." });
  }
});

const port = Number(process.env.PORT ?? 8787);
server.listen(port, () => {
  console.log(`Zephyr cloud API running on http://localhost:${port}`);
  console.log("Use Authorization: Bearer dev_local_key for local testing.");
});
