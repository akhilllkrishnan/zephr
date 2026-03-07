import { describe, expect, it } from "vitest";
import {
  generateComponentPrompt,
  generateComponentScaffold,
  getComponentTemplate,
  getDefaultIntent,
  getComponentSpec,
  getInstallSteps,
  getThemeVariants,
  listComponents,
  searchComponents
} from "../src";

describe("@zephrui/ai-registry", () => {
  it("lists components", () => {
    const items = listComponents();
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((item) => item.id === "button")).toBe(true);
  });

  it("supports search by intent", () => {
    const results = searchComponents("table");
    expect(results.some((item) => item.id === "data-table")).toBe(true);
  });

  it("returns install steps and theme variants", () => {
    expect(getInstallSteps("button").length).toBeGreaterThan(0);
    expect(getThemeVariants("button")).toContain("notion");
  });

  it("builds template and prompt from shared generator", () => {
    const template = getComponentTemplate("input", { packageManager: "npm" });
    expect(template).not.toBeNull();
    expect(template?.installCommand).toContain("npm install");
    expect(template?.usageSnippet).toContain("Input");

    const prompt = generateComponentPrompt("input", {
      assistant: "Codex",
      stylePack: "notion",
      accentColor: "#335cff",
      configSnippet: "export default { stylePack: 'notion' };"
    });
    expect(prompt).toContain("Theme: notion");
    expect(prompt).toContain("Component block: Input (input)");
  });

  it("builds scaffold content for CLI/docs consumers", () => {
    const scaffold = generateComponentScaffold("button", {
      assistant: "Cursor",
      stylePack: "stripe",
      accentColor: "#1d4ed8"
    });
    expect(scaffold).not.toBeNull();
    expect(scaffold?.snippetFileName).toBe("button.tsx");
    expect(scaffold?.promptFileName).toBe("button.prompt.md");
    expect(scaffold?.promptContent).toContain("Assistant: Cursor");
  });

  it("exposes structured ai hints with positive and negative guidance", () => {
    const spec = getComponentSpec("button");
    expect(spec).not.toBeNull();
    expect(spec?.aiHints.positive.length).toBeGreaterThan(0);
    expect(spec?.aiHints.negative.length).toBeGreaterThan(0);
    expect(spec?.aiHints.preferredImports.length).toBeGreaterThan(0);
  });

  it("returns category-backed default intent", () => {
    const intent = getDefaultIntent("data-table");
    expect(intent.length).toBeGreaterThan(20);
  });

  it("returns null for unknown component specs", () => {
    expect(getComponentSpec("not-real")).toBeNull();
  });
});
