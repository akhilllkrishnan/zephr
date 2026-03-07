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

  it("returns search results for component queries", () => {
    const result = callTool({
      name: "search_components",
      arguments: { query: "button" }
    }) as Array<{ id: string }>;

    expect(result.some((item) => item.id === "button")).toBe(true);
  });

  it("install_plan returns numbered steps array", () => {
    const result = callTool({
      name: "install_plan",
      arguments: { framework: "vite", packageManager: "npm", components: ["button"] }
    }) as { framework: string; steps: Array<{ step: number; title: string; command?: string }> };

    expect(result.framework).toBe("Vite");
    expect(Array.isArray(result.steps)).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[0].step).toBe(1);
    expect(result.steps[0].command).toContain("@zephrui/core");
  });

  it("install_plan works for nextjs with pnpm", () => {
    const result = callTool({
      name: "install_plan",
      arguments: { framework: "nextjs", packageManager: "pnpm", components: [] }
    }) as { framework: string; steps: Array<{ step: number }> };

    expect(result.framework).toBe("Next.js");
    expect(result.steps[0].step).toBe(1);
  });
});
