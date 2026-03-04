import { describe, expect, it } from "vitest";
import { LogoClient, type LogoProvider, getLogoByDomain, searchLogoCatalog } from "../src";

describe("@zephyr/logos", () => {
  it("searches catalog by brand and use-case", () => {
    const byBrand = searchLogoCatalog("openai");
    const byUseCase = searchLogoCatalog("payments billing");

    expect(byBrand.some((entry) => entry.name === "OpenAI")).toBe(true);
    expect(byUseCase.some((entry) => entry.name === "Stripe")).toBe(true);
    expect(getLogoByDomain("github.com")?.name).toBe("GitHub");
  });

  it("falls back when providers do not return a logo", async () => {
    const provider: LogoProvider = {
      id: "none",
      async getLogo() {
        return null;
      }
    };

    const client = new LogoClient({ providers: [provider], cacheTtlMs: 5_000 });
    const result = await client.resolve("example.com");

    expect(result.fallback).toBe(true);
    expect(result.source).toBe("zephyr-fallback");
    expect(result.url.startsWith("data:image/svg+xml,")).toBe(true);
  });

  it("uses catalog provider and caches responses", async () => {
    const client = new LogoClient({ cacheTtlMs: 60_000 });
    const first = await client.resolve("openai.com");
    const second = await client.resolve("openai.com");

    expect(first.source).toBe("zephyr-catalog");
    expect(first.fromCache).toBe(false);
    expect(second.fromCache).toBe(true);
  });

  it("blocks denied domains after takedown", async () => {
    const client = new LogoClient();
    client.requestTakedown("blocked.com", "Owner request");

    await expect(client.resolve("blocked.com")).rejects.toThrow(/blocked by compliance policy/i);
  });
});
