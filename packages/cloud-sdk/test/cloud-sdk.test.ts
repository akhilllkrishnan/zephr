import { afterEach, describe, expect, it, vi } from "vitest";
import { ZephyrCloudClient } from "../src";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("@zephyr/cloud-sdk", () => {
  it("sends authorization header when apiKey is configured", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ["Studio"]
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new ZephyrCloudClient({
      baseUrl: "http://localhost:8787",
      apiKey: "test_key"
    });

    const themes = await client.getThemes();
    expect(themes).toContain("Studio");

    const call = fetchMock.mock.calls[0];
    expect(call[0]).toBe("http://localhost:8787/v1/themes");

    const headers = new Headers((call[1] as RequestInit).headers);
    expect(headers.get("Authorization")).toBe("Bearer test_key");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("throws descriptive error for non-ok responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: async () => "Unauthorized"
      })
    );

    const client = new ZephyrCloudClient({ baseUrl: "http://localhost:8787" });
    await expect(client.getComponents()).rejects.toThrow("Zephyr cloud error 401: Unauthorized");
  });

  it("builds query-string endpoints for asset search routes", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        query: "settings",
        limit: 42,
        source: "cloud",
        items: []
      })
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new ZephyrCloudClient({
      baseUrl: "http://localhost:8787",
      apiKey: "test_key"
    });

    await client.searchIcons({ query: "settings", limit: 42, style: "outlined" });
    await client.listAvatarStyles({ query: "retro", limit: 10 });
    await client.searchLogos({ query: "payments", limit: 32 });

    expect(fetchMock.mock.calls[0][0]).toBe("http://localhost:8787/v1/icons?q=settings&limit=42&style=outlined");
    expect(fetchMock.mock.calls[1][0]).toBe("http://localhost:8787/v1/avatars/styles?q=retro&limit=10");
    expect(fetchMock.mock.calls[2][0]).toBe("http://localhost:8787/v1/logos?q=payments&limit=32");
  });

  it("posts license validation payload to public endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        valid: true,
        tier: "pro",
        status: "active",
        plan: "pro",
        message: "License valid (pro plan)."
      })
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new ZephyrCloudClient({
      baseUrl: "http://localhost:8787"
    });

    const result = await client.validateLicense({ licenseKey: "zephyr-pro-demo-2026" });
    expect(result.valid).toBe(true);

    const call = fetchMock.mock.calls[0];
    expect(call[0]).toBe("http://localhost:8787/v1/licenses/validate");
    const init = call[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ licenseKey: "zephyr-pro-demo-2026" }));
  });

  it("posts URL audit payload and returns report data", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        url: "https://example.com",
        scannedAt: "2026-03-04T00:00:00.000Z",
        source: "cloud",
        score: 82,
        status: "warn",
        pageTitle: "Example Domain",
        summary: "1 high, 1 medium issue found.",
        issues: [],
        recommendations: [],
        heatmap: []
      })
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new ZephyrCloudClient({
      baseUrl: "http://localhost:8787"
    });

    const report = await client.runUrlAudit({
      url: "https://example.com",
      notes: "Landing page review"
    });

    expect(report.url).toBe("https://example.com");
    expect(report.status).toBe("warn");

    const call = fetchMock.mock.calls[0];
    expect(call[0]).toBe("http://localhost:8787/v1/audit/url");
    const init = call[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.body).toBe(
      JSON.stringify({
        url: "https://example.com",
        notes: "Landing page review"
      })
    );
  });
});
