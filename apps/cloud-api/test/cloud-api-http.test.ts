/**
 * HTTP-level integration tests for the Zephr cloud API.
 * Starts a real test server that adapts Node HTTP requests into the extracted app handler.
 */

import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { handleNodeHttpRequest } from "../src/nodeAdapter";
import { sendJson } from "../src/http";

const TEST_PORT = 8788;
const BEARER = "Bearer dev_local_key";

async function testHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    await handleNodeHttpRequest(req, res, {
      baseUrl: `http://localhost:${TEST_PORT}`
    });
  } catch (error) {
    sendJson(res, 500, { error: String(error) });
  }
}

let server: Server;
let baseUrl: string;

beforeAll(() => {
  return new Promise<void>((resolve) => {
    server = createServer((req, res) => {
      testHandler(req, res).catch((err) => {
        sendJson(res, 500, { error: String(err) });
      });
    });
    server.listen(TEST_PORT, "127.0.0.1", () => {
      baseUrl = `http://127.0.0.1:${TEST_PORT}`;
      resolve();
    });
  });
});

afterAll(() => {
  return new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

function get(path: string, auth = true): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    headers: auth ? { Authorization: BEARER } : {}
  });
}

function post(path: string, body: unknown, auth = true): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: BEARER } : {})
    },
    body: JSON.stringify(body)
  });
}

describe("Cloud API — HTTP integration", () => {
  it("GET /health -> 200 with status ok", async () => {
    const res = await get("/health", false);
    expect(res.status).toBe(200);
    const json = await res.json() as { status: string };
    expect(json.status).toBe("ok");
  });

  it("GET /v1/components without auth -> 401", async () => {
    const res = await get("/v1/components", false);
    expect(res.status).toBe(401);
  });

  it("GET /v1/components with valid bearer -> 200 array", async () => {
    const res = await get("/v1/components");
    expect(res.status).toBe(200);
    const json = await res.json() as unknown[];
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBeGreaterThan(0);
  });

  it("GET /v1/themes with valid bearer -> 200 array", async () => {
    const res = await get("/v1/themes");
    expect(res.status).toBe(200);
    const json = await res.json() as unknown[];
    expect(Array.isArray(json)).toBe(true);
    expect(json).toContain("notion");
  });

  it("GET /v1/licenses/plans -> public plan list", async () => {
    const res = await get("/v1/licenses/plans", false);
    expect(res.status).toBe(200);
    const json = await res.json() as { plans: Array<{ id: string }> };
    expect(json.plans.map((plan) => plan.id)).toEqual(["individual", "startup", "enterprise"]);
  });

  it("POST /v1/licenses/validate -> returns validation payload", async () => {
    const res = await post("/v1/licenses/validate", { licenseKey: "zephr-pro-demo-2026" }, false);
    expect(res.status).toBe(200);
    const json = await res.json() as { valid: boolean; tier: string };
    expect(json.valid).toBe(true);
    expect(json.tier).toBe("pro");
  });

  it("POST /v1/audit/url -> returns structured report", async () => {
    const res = await post("/v1/audit/url", { url: "https://example.com" });
    expect(res.status).toBe(200);
    const json = await res.json() as { url: string; issues: unknown[] };
    expect(json.url).toBe("https://example.com");
    expect(Array.isArray(json.issues)).toBe(true);
  });

  it("GET /v1/icons -> returns icon items", async () => {
    const res = await get("/v1/icons?q=settings");
    expect(res.status).toBe(200);
    const json = await res.json() as { items: Array<{ name: string }> };
    expect(json.items.length).toBeGreaterThan(0);
  });
});
