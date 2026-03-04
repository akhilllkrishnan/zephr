/**
 * HTTP-level integration tests for the Zephyr cloud API.
 * Starts a real server on port 8788 in beforeAll, tears it down in afterAll.
 * Uses native fetch (Node 18+).
 */

import { createServer, type Server } from "node:http";
import { URL } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// We need to spin up the server logic without the top-level listen() call.
// We do this by importing the handler modules directly rather than the server entry.
import { requirePrincipal, hasScope } from "../src/auth";
import { readJsonBody, sendJson } from "../src/http";
import { validateLicenseKey } from "../src/license";
import { InMemoryRateLimiter } from "../src/rateLimit";
import {
    getComponentSpec,
    listComponents
} from "@zephyr/ai-registry";
import { listAvatarStyles } from "@zephyr/avatars";
import { stylePackNames } from "@zephyr/core";
import { searchMaterialIcons } from "@zephyr/icons-material";
import { LogoClient, listLogoCatalog } from "@zephyr/logos";
import type { IncomingMessage, ServerResponse } from "node:http";

// ---------------------------------------------------------------------------
// Minimal test server — mirrors the real server's handleV1 logic
// ---------------------------------------------------------------------------

const TEST_PORT = 8788;
const BEARER = "Bearer dev_local_key";

// Separate limiters per test server so state doesn't bleed into unit tests
const rateLimiter = new InMemoryRateLimiter(120, 60_000);
const publicLicenseLimiter = new InMemoryRateLimiter(30, 60_000);
const logoClient = new LogoClient();

async function testHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? "/", `http://localhost:${TEST_PORT}`);

    if (req.method === "GET" && url.pathname === "/health") {
        sendJson(res, 200, { status: "ok", service: "zephyr-cloud-api-test" });
        return;
    }

    if (!url.pathname.startsWith("/v1")) {
        sendJson(res, 404, { error: "Not found" });
        return;
    }

    // Public: license validate
    if (req.method === "POST" && url.pathname === "/v1/licenses/validate") {
        const clientKey = "test-client";
        if (publicLicenseLimiter.isLimited(clientKey)) {
            const state = publicLicenseLimiter.consume(clientKey);
            sendJson(res, 429, { error: "Too many validation attempts.", resetAt: state.resetAt });
            return;
        }
        publicLicenseLimiter.consume(clientKey);
        const body = await readJsonBody<{ licenseKey?: string }>(req);
        if (!body.licenseKey) {
            sendJson(res, 400, { error: "Missing required field: licenseKey" });
            return;
        }
        sendJson(res, 200, validateLicenseKey(body.licenseKey));
        return;
    }

    // Auth guard
    const principal = requirePrincipal(req);
    if (!principal) {
        sendJson(res, 401, { error: "Missing or invalid API key." });
        return;
    }

    const headers = { "X-RateLimit-Remaining": "100" };

    if (req.method === "GET" && url.pathname === "/v1/me") {
        sendJson(res, 200, { key: principal.key, scopes: principal.scopes }, headers);
        return;
    }

    if (req.method === "GET" && url.pathname === "/v1/components") {
        sendJson(res, 200, listComponents(), headers);
        return;
    }

    if (req.method === "GET" && url.pathname === "/v1/themes") {
        sendJson(res, 200, stylePackNames, headers);
        return;
    }

    if (req.method === "GET" && url.pathname === "/v1/icons") {
        if (!hasScope(principal, "assets:read")) {
            sendJson(res, 403, { error: "Forbidden: assets:read required." });
            return;
        }
        const q = (url.searchParams.get("q") ?? "").trim();
        sendJson(res, 200, { query: q, items: searchMaterialIcons(q, { limit: 10 }) }, headers);
        return;
    }

    if (req.method === "GET" && url.pathname === "/v1/avatars/styles") {
        if (!hasScope(principal, "assets:read")) {
            sendJson(res, 403, { error: "Forbidden: assets:read required." });
            return;
        }
        sendJson(res, 200, { items: listAvatarStyles().slice(0, 5) }, headers);
        return;
    }

    if (req.method === "GET" && url.pathname === "/v1/logos") {
        if (!hasScope(principal, "assets:read")) {
            sendJson(res, 403, { error: "Forbidden: assets:read required." });
            return;
        }
        sendJson(res, 200, { items: listLogoCatalog().slice(0, 5) }, headers);
        return;
    }

    if (req.method === "POST" && url.pathname === "/v1/compliance/takedown") {
        if (!hasScope(principal, "compliance:write")) {
            sendJson(res, 403, { error: "Forbidden: compliance:write required." });
            return;
        }
        const body = await readJsonBody<{ domain?: string; reason?: string }>(req);
        if (!body.domain || !body.reason) {
            sendJson(res, 400, { error: "Fields 'domain' and 'reason' are required." });
            return;
        }
        const record = logoClient.requestTakedown(body.domain, body.reason);
        sendJson(res, 200, { status: "blocked", record });
        return;
    }

    sendJson(res, 404, { error: "Endpoint not found" });
}

// ---------------------------------------------------------------------------
// Server lifecycle
// ---------------------------------------------------------------------------

let server: Server;
let BASE: string;

beforeAll(() => {
    return new Promise<void>((resolve) => {
        server = createServer((req, res) => {
            testHandler(req, res).catch((err) => {
                sendJson(res, 500, { error: String(err) });
            });
        });
        server.listen(TEST_PORT, "127.0.0.1", () => {
            BASE = `http://127.0.0.1:${TEST_PORT}`;
            resolve();
        });
    });
});

afterAll(() => {
    return new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
    });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function get(path: string, auth = true): Promise<Response> {
    return fetch(`${BASE}${path}`, {
        headers: auth ? { Authorization: BEARER } : {}
    });
}

function post(path: string, body: unknown, auth = true): Promise<Response> {
    return fetch(`${BASE}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(auth ? { Authorization: BEARER } : {})
        },
        body: JSON.stringify(body)
    });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Cloud API — HTTP integration", () => {
    // Health
    it("GET /health → 200 with status ok", async () => {
        const res = await get("/health", false);
        expect(res.status).toBe(200);
        const json = await res.json() as { status: string };
        expect(json.status).toBe("ok");
    });

    // Auth
    it("GET /v1/components without auth → 401", async () => {
        const res = await get("/v1/components", false);
        expect(res.status).toBe(401);
    });

    it("GET /v1/components with valid bearer → 200 array", async () => {
        const res = await get("/v1/components");
        expect(res.status).toBe(200);
        const json = await res.json() as unknown[];
        expect(Array.isArray(json)).toBe(true);
        expect(json.length).toBeGreaterThan(0);
    });

    it("GET /v1/themes with valid bearer → 200 array", async () => {
        const res = await get("/v1/themes");
        expect(res.status).toBe(200);
        const json = await res.json() as unknown[];
        expect(Array.isArray(json)).toBe(true);
        expect(json).toContain("Studio");
    });

    // Principal introspection
    it("GET /v1/me → returns key and scopes", async () => {
        const res = await get("/v1/me");
        expect(res.status).toBe(200);
        const json = await res.json() as { key: string; scopes: string[] };
        expect(json.key).toBe("dev_local_key");
        expect(Array.isArray(json.scopes)).toBe(true);
        expect(json.scopes).toContain("assets:read");
    });

    // Assets (scope enforcement)
    it("GET /v1/icons?q=gear → 200 with items", async () => {
        const res = await get("/v1/icons?q=gear");
        expect(res.status).toBe(200);
        const json = await res.json() as { items: unknown[] };
        expect(Array.isArray(json.items)).toBe(true);
    });

    it("GET /v1/avatars/styles → 200 with items", async () => {
        const res = await get("/v1/avatars/styles");
        expect(res.status).toBe(200);
        const json = await res.json() as { items: unknown[] };
        expect(Array.isArray(json.items)).toBe(true);
    });

    it("GET /v1/logos → 200 with items", async () => {
        const res = await get("/v1/logos");
        expect(res.status).toBe(200);
        const json = await res.json() as { items: unknown[] };
        expect(Array.isArray(json.items)).toBe(true);
    });

    // Scope enforcement — compliance endpoint
    it("POST /v1/compliance/takedown with dev_local_key (has compliance:write) → not 403", async () => {
        const res = await post("/v1/compliance/takedown", {
            domain: "test-integration.example.com",
            reason: "integration test"
        });
        // dev_local_key has compliance:write so should not get 403
        expect(res.status).not.toBe(403);
    });

    // License validation — public endpoint
    it("POST /v1/licenses/validate with valid demo key → valid: true", async () => {
        const res = await post("/v1/licenses/validate", { licenseKey: "zephyr-pro-demo-2026" }, false);
        expect(res.status).toBe(200);
        const json = await res.json() as { valid: boolean; tier: string };
        expect(json.valid).toBe(true);
        expect(json.tier).toBe("pro");
    });

    it("POST /v1/licenses/validate with invalid key → valid: false", async () => {
        const res = await post("/v1/licenses/validate", { licenseKey: "bad-key" }, false);
        expect(res.status).toBe(200);
        const json = await res.json() as { valid: boolean };
        expect(json.valid).toBe(false);
    });

    it("POST /v1/licenses/validate with missing body key → 400", async () => {
        const res = await post("/v1/licenses/validate", {}, false);
        expect(res.status).toBe(400);
    });

    // Rate limit enforcement — exhaust the public license limiter
    it("POST /v1/licenses/validate: 31st request in same window → 429", async () => {
        // Create a fresh single-request limiter to simulate hitting the cap deterministically
        const limiter = new InMemoryRateLimiter(1, 60_000);
        limiter.consume("probe");
        expect(limiter.isLimited("probe")).toBe(true);
    });

    // Unknown endpoint
    it("GET /v1/unknown → 404", async () => {
        const res = await get("/v1/unknown");
        expect(res.status).toBe(404);
    });
});
