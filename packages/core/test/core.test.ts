import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  generateCssVariables,
  loadZephyrConfig,
  resolveConfig,
  resolveStylePackName,
  resolveTokens,
  stylePackNames,
  stylePacks
} from "../src";

describe("@zephyr/core", () => {
  it("resolves defaults for style pack and prefix", () => {
    const resolved = resolveConfig({});
    expect(resolved.stylePack).toBe("notion");
    expect(resolved.prefix).toBe("z");
    expect(resolved.tokens.color.primary).toBe(stylePacks.notion.color.primary);
  });

  it("applies semantic token aliases", () => {
    const tokens = resolveTokens({
      semanticAliases: {
        "color.brand": "color.primary",
        "color.page": "color.background"
      }
    });

    expect(tokens.color.brand).toBe(tokens.color.primary);
    expect(tokens.color.page).toBe(tokens.color.background);
  });

  it("maps legacy style packs to the new public packs", () => {
    expect(resolveStylePackName("Studio")).toBe("notion");
    expect(resolveStylePackName("Clarity")).toBe("notion");
    expect(resolveStylePackName("Enterprise")).toBe("linear");
  });

  it("compiles CSS variable output for light and dark tokens", () => {
    const resolved = resolveConfig({ stylePack: "linear", prefix: "zp" });
    const css = generateCssVariables(resolved.tokens, resolved.prefix);

    expect(css).toContain("--zp-color-primary");
    expect(css).toContain("--zp-type-family-sans");
    expect(css).toContain("--zp-breakpoint-md");
    expect(css).toContain("[data-theme=\"dark\"]");
  });

  it("loads style pack values from zephyr.config.ts", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "zephyr-core-config-"));
    writeFileSync(
      join(tempDir, "zephyr.config.ts"),
      `export default {
  stylePack: "notion",
  tokens: {
    color: {
      primary: "#102a43",
      accent: "#102a43",
      primaryContrast: "#ffffff"
    }
  }
};
`
    );

    try {
      const resolved = loadZephyrConfig(tempDir);
      expect(resolved.stylePack).toBe("notion");
      expect(resolved.tokens.color.primary).toBe("#102a43");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("enforces required color groups and light/dark key parity", () => {
    const requiredColorKeys = [
      "staticBlack",
      "staticWhite",
      "background950",
      "background800",
      "background600",
      "background400",
      "background200",
      "background0",
      "text950",
      "text700",
      "text500",
      "text300",
      "stroke400",
      "stroke300",
      "stroke200",
      "stroke100",
      "accent900",
      "accent700",
      "accent500",
      "accent300",
      "semanticRed900",
      "semanticRed700",
      "semanticRed500",
      "semanticRed300",
      "semanticYellow900",
      "semanticYellow700",
      "semanticYellow500",
      "semanticYellow300",
      "semanticGreen900",
      "semanticGreen700",
      "semanticGreen500",
      "semanticGreen300"
    ];
    const hexPattern = /^#[0-9a-fA-F]{6}$/;

    for (const packName of stylePackNames) {
      const tokens = stylePacks[packName];
      const lightKeys = Object.keys(tokens.color);
      const darkKeys = Object.keys(tokens.colorDark ?? {});

      for (const key of requiredColorKeys) {
        expect(lightKeys).toContain(key);
        expect(darkKeys).toContain(key);
        expect(tokens.color[key]).toMatch(hexPattern);
        expect(tokens.colorDark?.[key]).toMatch(hexPattern);
      }
    }
  });
});
