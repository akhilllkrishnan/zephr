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
import {
  activateLsLicenseKey,
  deactivateLsLicenseKey,
  getWebhookSecret,
  verifyWebhookSignature,
  type LsLicenseKeyAttributes,
  type LsOrderAttributes,
  type LsWebhookEvent
} from "./lemonsqueezy";
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

// ---------------------------------------------------------------------------
// Auth-protected route handler
// ---------------------------------------------------------------------------

async function handleV1(request: IncomingMessage, response: ServerResponse, url: URL): Promise<void> {
  // --- Public endpoint: Lemon Squeezy webhook (no Bearer, verified by HMAC) ---
  if (request.method === "POST" && url.pathname === "/v1/webhooks/lemonsqueezy") {
    const rawChunks: Uint8Array[] = [];
    for await (const chunk of request) {
      rawChunks.push(typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk);
    }
    const rawBody = Buffer.concat(rawChunks).toString("utf8");
    const signature = String(request.headers["x-signature"] ?? "");

    const secret = getWebhookSecret();
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
    console.log(`[webhook:lemonsqueezy] event=${eventName} id=${event.data?.id}`);

    if (eventName === "order_created") {
      const attrs = event.data.attributes as LsOrderAttributes;
      console.log(
        `[webhook:lemonsqueezy] order #${attrs.order_number} by ${attrs.user_email}` +
        ` status=${attrs.status} ${attrs.total} ${attrs.currency}`
      );
    }

    if (eventName === "license_key_created") {
      const attrs = event.data.attributes as LsLicenseKeyAttributes;
      console.log(
        `[webhook:lemonsqueezy] license_key_created status=${attrs.status}` +
        ` limit=${attrs.activation_limit} product=${attrs.product_id}`
      );
      // TODO: persist to DB and send custom confirmation email when ready
    }

    sendJson(response, 200, { received: true, event: eventName });
    auditLog("webhook:lemonsqueezy", request, 200, { event: eventName });
    return;
  }

  // --- Public endpoint: license activate (no Bearer required) ---
  if (request.method === "POST" && url.pathname === "/v1/licenses/activate") {
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
      sendJson(response, result.activated ? 200 : 422, result);
      auditLog("public:license:activate", request, result.activated ? 200 : 422);
    } catch (err) {
      console.error("[license/activate]", err);
      sendJson(response, 503, { error: "License activation service unavailable." });
    }
    return;
  }

  // --- Public endpoint: license deactivate (no Bearer required) ---
  if (request.method === "POST" && url.pathname === "/v1/licenses/deactivate") {
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
      sendJson(response, result.deactivated ? 200 : 422, result);
      auditLog("public:license:deactivate", request, result.deactivated ? 200 : 422);
    } catch (err) {
      console.error("[license/deactivate]", err);
      sendJson(response, 503, { error: "License deactivation service unavailable." });
    }
    return;
  }

  // --- Public endpoint: license validation (no Bearer required) ---
  if (request.method === "POST" && url.pathname === "/v1/licenses/validate") {
    const clientKey = request.socket.remoteAddress ?? "license-public";

    if (publicLicenseLimiter.isLimited(clientKey)) {
      const state = publicLicenseLimiter.consume(clientKey);
      sendJson(
        response,
        429,
        {
          error: "Too many validation attempts. Please wait before retrying.",
          resetAt: state.resetAt
        },
        {
          "X-RateLimit-Remaining": String(state.remaining),
          "X-RateLimit-Reset": state.resetAt
        }
      );
      auditLog("public:license", request, 429);
      return;
    }

    const state = publicLicenseLimiter.consume(clientKey);
    const rateHeaders = {
      "X-RateLimit-Remaining": String(state.remaining),
      "X-RateLimit-Reset": state.resetAt
    };

    const body = await readJsonBody<{ licenseKey?: string }>(request, {
      requireObject: true,
      requireContentType: true
    });
    if (!body.licenseKey) {
      sendJson(response, 400, { error: "Missing required field: licenseKey" }, rateHeaders);
      auditLog("public:license", request, 400);
      return;
    }

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
            webhookSecretConfigured: Boolean(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET?.trim())
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
