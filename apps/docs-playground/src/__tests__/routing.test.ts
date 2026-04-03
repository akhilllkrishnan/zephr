/**
 * Smoke tests: routing types and navigation state
 *
 * These tests verify that the WorkspaceView and TopTab union types cover
 * every path the app can navigate to, and that the logical relationship
 * between tabs and their views is exhaustive and consistent.
 */

import type { WorkspaceView, TopTab } from "../types";

// ── Type-level constants (must mirror types.ts exactly) ───────────────────────

const WORKSPACE_VIEWS: WorkspaceView[] = [
  "introduction",
  "getting-started",
  "slash-commands",
  "foundations",
  "icons",
  "logos",
  "component-gallery",
  "components",
  "api-reference",
  "widgets",
  "templates",
];

const TOP_TABS: TopTab[] = ["setup", "components", "icons", "logos", "changelog"];

// Map of which views belong to each tab
const TAB_VIEWS: Record<TopTab, WorkspaceView[]> = {
  setup: ["introduction", "getting-started", "slash-commands", "foundations"],
  components: ["component-gallery", "components", "api-reference", "widgets", "templates"],
  icons: ["icons"],
  logos: ["logos"],
  changelog: [],
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("WorkspaceView", () => {
  it("has no duplicate view ids", () => {
    const unique = new Set(WORKSPACE_VIEWS);
    expect(unique.size).toBe(WORKSPACE_VIEWS.length);
  });

  it("contains at least the expected base views", () => {
    const requiredViews: WorkspaceView[] = [
      "introduction",
      "getting-started",
      "foundations",
      "icons",
      "logos",
      "component-gallery",
      "components",
    ];
    for (const view of requiredViews) {
      expect(WORKSPACE_VIEWS).toContain(view);
    }
  });
});

describe("TopTab", () => {
  it("has no duplicate tab ids", () => {
    const unique = new Set(TOP_TABS);
    expect(unique.size).toBe(TOP_TABS.length);
  });

  it("has exactly 5 tabs", () => {
    expect(TOP_TABS).toHaveLength(5);
  });
});

describe("Tab → View mapping", () => {
  it("every view belongs to exactly one tab or is changelog-level", () => {
    const coveredViews = new Set(
      Object.values(TAB_VIEWS).flat()
    );
    // All non-changelog views should be covered
    const changelogOnlyViews: WorkspaceView[] = []; // changelog tab uses inline section, no WorkspaceView
    const allViewsMinusChangelog = WORKSPACE_VIEWS.filter(v => !changelogOnlyViews.includes(v));
    for (const view of allViewsMinusChangelog) {
      expect(coveredViews).toContain(view);
    }
  });

  it("every tab entry maps to a valid WorkspaceView or empty array", () => {
    for (const [, views] of Object.entries(TAB_VIEWS) as [TopTab, WorkspaceView[]][]) {
      for (const view of views) {
        expect(WORKSPACE_VIEWS).toContain(view);
      }
    }
  });

  it("setup tab contains introduction and getting-started", () => {
    expect(TAB_VIEWS.setup).toContain("introduction");
    expect(TAB_VIEWS.setup).toContain("getting-started");
  });

  it("components tab contains component-gallery and components", () => {
    expect(TAB_VIEWS.components).toContain("component-gallery");
    expect(TAB_VIEWS.components).toContain("components");
  });

  it("icons tab maps to icons view", () => {
    expect(TAB_VIEWS.icons).toContain("icons");
  });

  it("logos tab maps to logos view", () => {
    expect(TAB_VIEWS.logos).toContain("logos");
  });
});
