import { afterEach, describe, expect, it, vi } from "vitest";
import { ZephrCloudClient, ZephrCloudError } from "../src";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("@zephrui/cloud-sdk", () => {
  it("sends authorization header when apiKey is configured", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ["notion"]
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new ZephrCloudClient({
      baseUrl: "http://localhost:8787",
      apiKey: "test_key"
    });

    const themes = await client.getThemes();
    expect(themes).toContain("notion");

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

    const client = new ZephrCloudClient({ baseUrl: "http://localhost:8787" });
    try {
      await client.getComponents();
      throw new Error("Expected getComponents to throw.");
    } catch (error) {
      expect(error).toBeInstanceOf(ZephrCloudError);
      expect((error as Error).message).toContain("Zephr cloud error 401: Unauthorized");
    }
  });

  it("validates baseUrl in constructor", () => {
    expect(() => new ZephrCloudClient({ baseUrl: "localhost:8787" })).toThrow(
      'Invalid Zephr cloud baseUrl protocol: "localhost:"'
    );
    expect(() => new ZephrCloudClient({ baseUrl: "ftp://localhost:8787" })).toThrow(
      'Invalid Zephr cloud baseUrl protocol: "ftp:"'
    );
  });

  it("throws timeout error when request aborts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue({ name: "AbortError" })
    );

    const client = new ZephrCloudClient({
      baseUrl: "http://localhost:8787",
      timeoutMs: 1000
    });

    await expect(client.getThemes()).rejects.toThrow("Zephr cloud request timed out after 1000ms");
  });

  it("throws when success response is not valid JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error("Unexpected token < in JSON");
        }
      })
    );

    const client = new ZephrCloudClient({ baseUrl: "http://localhost:8787" });
    await expect(client.getThemes()).rejects.toThrow("Zephr cloud returned invalid JSON.");
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

    const client = new ZephrCloudClient({
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

    const client = new ZephrCloudClient({
      baseUrl: "http://localhost:8787"
    });

    const result = await client.validateLicense({ licenseKey: "zephr-pro-demo-2026" });
    expect(result.valid).toBe(true);

    const call = fetchMock.mock.calls[0];
    expect(call[0]).toBe("http://localhost:8787/v1/licenses/validate");
    const init = call[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ licenseKey: "zephr-pro-demo-2026" }));
  });

  it("posts license activation and deactivation payloads", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          activated: true
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          deactivated: true
        })
      });
    vi.stubGlobal("fetch", fetchMock);

    const client = new ZephrCloudClient({
      baseUrl: "http://localhost:8787"
    });

    const activation = await client.activateLicense({
      licenseKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      instanceName: "my-workspace"
    });
    expect(activation.activated).toBe(true);

    const deactivation = await client.deactivateLicense({
      licenseKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      instanceId: "instance_123"
    });
    expect(deactivation.deactivated).toBe(true);

    const activationCall = fetchMock.mock.calls[0];
    expect(activationCall[0]).toBe("http://localhost:8787/v1/licenses/activate");
    const activationInit = activationCall[1] as RequestInit;
    expect(activationInit.method).toBe("POST");
    expect(activationInit.body).toBe(
      JSON.stringify({
        licenseKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        instanceName: "my-workspace"
      })
    );

    const deactivationCall = fetchMock.mock.calls[1];
    expect(deactivationCall[0]).toBe("http://localhost:8787/v1/licenses/deactivate");
    const deactivationInit = deactivationCall[1] as RequestInit;
    expect(deactivationInit.method).toBe("POST");
    expect(deactivationInit.body).toBe(
      JSON.stringify({
        licenseKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        instanceId: "instance_123"
      })
    );
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

    const client = new ZephrCloudClient({
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
