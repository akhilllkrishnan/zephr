import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { requirePrincipal } from "../src/auth";
import { runUrlAudit } from "../src/audit";
import { HttpError, readJsonBody, sendJson } from "../src/http";
import { validateLicenseKey } from "../src/license";
import { InMemoryRateLimiter } from "../src/rateLimit";

describe("@zephyr/cloud-api module tests", () => {
  it("authorizes known bearer token", () => {
    const principal = requirePrincipal({
      headers: {
        authorization: "Bearer dev_local_key"
      }
    } as never);

    expect(principal).not.toBeNull();
    expect(principal?.key).toBe("dev_local_key");
  });

  it("enforces in-memory rate limits", () => {
    const limiter = new InMemoryRateLimiter(2, 10_000);

    limiter.consume("alpha");
    limiter.consume("alpha");

    expect(limiter.isLimited("alpha")).toBe(true);
  });

  it("reads JSON body from request stream", async () => {
    const stream = Readable.from([JSON.stringify({ feature: "snippets" })]);
    const body = await readJsonBody<{ feature: string }>(stream as never);

    expect(body.feature).toBe("snippets");
  });

  it("throws HttpError(400) for malformed JSON", async () => {
    const stream = Readable.from(["{"]);
    await expect(readJsonBody(stream as never)).rejects.toMatchObject<HttpError>({
      statusCode: 400,
      code: "INVALID_JSON"
    });
  });

  it("throws HttpError(415) when content type is not JSON but required", async () => {
    const stream = Readable.from([JSON.stringify({ ok: true })]);
    (stream as unknown as { headers: Record<string, string> }).headers = {
      "content-type": "text/plain"
    };

    await expect(
      readJsonBody(stream as never, { requireContentType: true, requireObject: true })
    ).rejects.toMatchObject<HttpError>({
      statusCode: 415,
      code: "UNSUPPORTED_MEDIA_TYPE"
    });
  });

  it("throws HttpError(413) when payload exceeds limit", async () => {
    const tooLarge = JSON.stringify({ payload: "x".repeat(64) });
    const stream = Readable.from([tooLarge]);

    await expect(readJsonBody(stream as never, { maxBytes: 16 })).rejects.toMatchObject<HttpError>({
      statusCode: 413,
      code: "PAYLOAD_TOO_LARGE"
    });
  });

  it("writes JSON responses with standard headers", () => {
    let capturedStatus = 0;
    let capturedHeaders: Record<string, string> = {};
    let capturedBody = "";

    const response = {
      writeHead(statusCode: number, headers: Record<string, string>) {
        capturedStatus = statusCode;
        capturedHeaders = headers;
      },
      end(body: string) {
        capturedBody = body;
      }
    };

    sendJson(response as never, 201, { ok: true }, { "X-Test": "yes" });

    expect(capturedStatus).toBe(201);
    expect(capturedHeaders["Content-Type"]).toContain("application/json");
    expect(capturedHeaders["X-Test"]).toBe("yes");
    expect(JSON.parse(capturedBody)).toEqual({ ok: true });
  });

  it("validates a known demo license key", async () => {
    const result = await validateLicenseKey("zephyr-pro-demo-2026");

    expect(result.valid).toBe(true);
    expect(result.tier).toBe("pro");
    expect(result.status).toBe("active");
  });

  it("rejects malformed license keys", async () => {
    const result = await validateLicenseKey("invalid");

    expect(result.valid).toBe(false);
    expect(result.status).toBe("invalid");
  });

  it("runs URL audit and returns structured issues", async () => {
    const html = `
      <html>
        <head>
          <title>Demo</title>
        </head>
        <body>
          <img src="/hero.png" />
          <input type="email" />
          <button>Submit</button>
        </body>
      </html>
    `;

    const report = await runUrlAudit(
      { url: "https://example.com" },
      async () => ({
        ok: true,
        status: 200,
        text: async () => html
      })
    );

    expect(report.url).toBe("https://example.com");
    expect(report.source).toBe("cloud");
    expect(report.issues.length).toBeGreaterThan(0);
    expect(report.recommendations.length).toBeGreaterThan(0);
  });
});
