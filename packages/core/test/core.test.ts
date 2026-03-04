import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { compileUtilities, loadZephyrConfig, resolveConfig, resolveTokens } from "../src";

describe("@zephyr/core", () => {
  it("resolves defaults for style pack and prefix", () => {
    const resolved = resolveConfig({});
    expect(resolved.stylePack).toBe("Studio");
    expect(resolved.prefix).toBe("z");
    expect(resolved.tokens.color.primary).toBe("#121212");
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

  it("resolves clarity style pack tokens", () => {
    const resolved = resolveConfig({ stylePack: "Clarity" });
    expect(resolved.tokens.color.primary).toBe("#121212");
    expect(resolved.tokens.type.family.sans).toContain("Inter");
    expect(resolved.tokens.radius.lg).toBe("1.25rem");
  });

  it("compiles CSS variables, utilities, and responsive classes", () => {
    const resolved = resolveConfig({ stylePack: "Enterprise", prefix: "zp" });
    const css = compileUtilities(resolved.tokens, {
      prefix: resolved.prefix,
      includeResponsive: true
    });

    expect(css).toContain("--zp-color-primary");
    expect(css).toContain(".zp-bg-primary");
    expect(css).toContain("@media (min-width: 768px)");
    expect(css).toContain(".md\\:zp-text-primary");
    expect(css).toContain(".zp-border{border:1px solid var(--zp-color-border);}");
    expect(css).toContain(".zp-ml-4");
    expect(css).toContain(".zp-fixed{position:fixed;}");
    expect(css).toContain(".zp-h-full{height:100%;}");
  });

  it("loads style pack values from zephyr.config.ts", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "zephyr-core-config-"));
    writeFileSync(
      join(tempDir, "zephyr.config.ts"),
      `export default {
  stylePack: "Clarity",
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
      expect(resolved.stylePack).toBe("Clarity");
      expect(resolved.tokens.color.primary).toBe("#102a43");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
