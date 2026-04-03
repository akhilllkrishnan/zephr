import { describe, expect, it } from "vitest";
import { callTool, listTools } from "../src/tools";

describe("@zephrui/mcp-server tools", () => {
  it("exposes expected tool names", () => {
    const names = listTools().map((tool) => tool.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "search_components",
        "get_component_spec",
        "get_install_steps",
        "get_usage_examples",
        "get_theme_variants",
        "scaffold_page",
        "apply_theme",
        "install_plan"
      ])
    );
  });

  it("returns search results for component queries", async () => {
    const result = await callTool({
      name: "search_components",
      arguments: { query: "button" }
    }) as Array<{ id: string }>;

    expect(Array.isArray(result)).toBe(true);
    expect(result.some((item) => item.id === "button")).toBe(true);
  });

  it("install_plan returns numbered steps array", async () => {
    const result = await callTool({
      name: "install_plan",
      arguments: { framework: "vite", packageManager: "npm", components: ["button"] }
    }) as { framework: string; steps: Array<{ step: number; title: string; command?: string }> };

    expect(result.framework).toBe("Vite");
    expect(Array.isArray(result.steps)).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[0].step).toBe(1);
    expect(result.steps[0].command).toContain("@zephrui/core");
  });

  it("install_plan works for nextjs with pnpm", async () => {
    const result = await callTool({
      name: "install_plan",
      arguments: { framework: "nextjs", packageManager: "pnpm", components: [] }
    }) as { framework: string; steps: Array<{ step: number }> };

    expect(result.framework).toBe("Next.js");
    expect(result.steps[0].step).toBe(1);
  });

  it("get_component_spec returns spec for known component", async () => {
    const result = await callTool({
      name: "get_component_spec",
      arguments: { id: "button" }
    }) as { id: string; name: string } | null;

    expect(result).not.toBeNull();
    expect(result?.id).toBe("button");
    expect(result?.name).toBe("Button");
  });

  it("apply_theme returns config source for stripe pack", async () => {
    const result = await callTool({
      name: "apply_theme",
      arguments: { stylePack: "stripe", accentColor: "#533afd", packageManager: "pnpm" }
    }) as { configSource: string; fileName: string };

    expect(result.fileName).toBe("zephr.config.ts");
    expect(result.configSource).toContain("stripe");
    expect(result.configSource).toContain("@zephrui/core");
  });

  it("list_templates returns array with id, name, description", async () => {
    const result = await callTool({
      name: "list_templates",
      arguments: {}
    }) as Array<{ id: string; name: string; description: string }>;

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("description");
  });

  it("zephr_render returns error when playwright is unavailable (non-TTY)", async () => {
    // In test/CI environments, Playwright browser may not be installed.
    // renderJsx gracefully returns an error object rather than throwing.
    const result = await callTool({
      name: "zephr_render",
      arguments: { jsx: "<div>Hello</div>", theme: "light", width: 800 }
    }) as { screenshot: string; error?: string; violations: unknown[]; contrastResults: unknown[] };

    // Should always have these fields regardless of Playwright availability
    expect(typeof result.screenshot).toBe("string");
    expect(Array.isArray(result.violations)).toBe(true);
    expect(Array.isArray(result.contrastResults)).toBe(true);
  });
});
