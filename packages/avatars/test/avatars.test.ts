import { afterEach, describe, expect, it, vi } from "vitest";
import { AvatarClient, generateAvatar, listAvatarStyles, searchAvatarStyles } from "../src";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("@zephyr/avatars", () => {
  it("generates deterministic local avatars", () => {
    const one = generateAvatar({ name: "Akhil Krishnan", seed: "seed-1", style: "ring" });
    const two = generateAvatar({ name: "Akhil Krishnan", seed: "seed-1", style: "ring" });

    expect(one.svg).toBe(two.svg);
    expect(one.dataUri).toContain("data:image/svg+xml,");
  });

  it("searches avatar styles by use case keywords", () => {
    const results = searchAvatarStyles("retro gaming");
    expect(results[0]?.id).toBe("pixel");
    expect(listAvatarStyles().length).toBeGreaterThan(6);
  });

  it("uses local fallback when cloud request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({})
      })
    );

    const client = new AvatarClient({ apiBaseUrl: "https://api.zephyr.test", apiKey: "key" });
    const result = await client.createAvatar({ name: "Zephyr User", style: "beam" });

    expect(result.svg).toContain("Zephyr User");
    expect(result.dataUri.startsWith("data:image/svg+xml,")).toBe(true);
  });
});
