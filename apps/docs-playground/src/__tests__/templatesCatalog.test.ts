/**
 * Tests for the templates/widgets catalog data integrity.
 */

import { templateCatalogMeta, templatesV2CatalogIds } from "../views/templatesCatalog";

describe("templateCatalogMeta", () => {
  it("has at least 25 entries", () => {
    expect(templateCatalogMeta.length).toBeGreaterThanOrEqual(25);
  });

  it("has exactly 5 template-category entries", () => {
    const templates = templateCatalogMeta.filter((e) => e.category === "template");
    expect(templates).toHaveLength(5);
  });

  it("has at least 20 example-category entries", () => {
    const examples = templateCatalogMeta.filter((e) => e.category === "example");
    expect(examples.length).toBeGreaterThanOrEqual(20);
  });

  it("all IDs are unique", () => {
    const ids = templateCatalogMeta.map((e) => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("all IDs start with 'template-'", () => {
    for (const entry of templateCatalogMeta) {
      expect(entry.id).toMatch(/^template-/);
    }
  });

  it("all labels are non-empty strings", () => {
    for (const entry of templateCatalogMeta) {
      expect(typeof entry.label).toBe("string");
      expect(entry.label.length).toBeGreaterThan(0);
    }
  });

  it("includes the 5 primary templates", () => {
    const primaryIds = [
      "template-dashboard",
      "template-auth",
      "template-settings",
      "template-onboarding",
      "template-marketing",
    ];
    for (const id of primaryIds) {
      const found = templateCatalogMeta.find((e) => e.id === id);
      expect(found).toBeDefined();
      expect(found?.category).toBe("template");
    }
  });

  it("category is either 'template' or 'example'", () => {
    for (const entry of templateCatalogMeta) {
      expect(["template", "example"]).toContain(entry.category);
    }
  });
});

describe("templatesV2CatalogIds", () => {
  it("is a non-empty readonly array", () => {
    expect(templatesV2CatalogIds.length).toBeGreaterThan(0);
  });

  it("all v2 IDs exist in the full catalog", () => {
    const allIds = new Set(templateCatalogMeta.map((e) => e.id));
    for (const id of templatesV2CatalogIds) {
      expect(allIds).toContain(id);
    }
  });

  it("has no duplicate IDs", () => {
    const unique = new Set(templatesV2CatalogIds);
    expect(unique.size).toBe(templatesV2CatalogIds.length);
  });
});
