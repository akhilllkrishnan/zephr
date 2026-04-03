/**
 * Unit tests for renderer/compliance.ts pure functions.
 * These don't need Playwright — they test the math and color logic.
 */

import { describe, expect, it } from "vitest";
import { findClosestToken, contrastRatio } from "../src/renderer/compliance";

describe("contrastRatio", () => {
  it("black on white = 21:1", () => {
    const ratio = contrastRatio("#000000", "#ffffff");
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("white on white = 1:1", () => {
    const ratio = contrastRatio("#ffffff", "#ffffff");
    expect(ratio).toBeCloseTo(1, 1);
  });

  it("ratio is symmetric", () => {
    const fwRatio = contrastRatio("#533afd", "#ffffff");
    const wfRatio = contrastRatio("#ffffff", "#533afd");
    expect(fwRatio).toBeCloseTo(wfRatio, 5);
  });

  it("ratio is always >= 1", () => {
    const pairs = [
      ["#ff0000", "#00ff00"],
      ["#0000ff", "#ffff00"],
      ["#123456", "#fedcba"],
    ];
    for (const [a, b] of pairs) {
      expect(contrastRatio(a, b)).toBeGreaterThanOrEqual(1);
    }
  });

  it("returns 1 for invalid hex inputs", () => {
    expect(contrastRatio("not-a-color", "#ffffff")).toBe(1);
    expect(contrastRatio("#ffffff", "rgb(0,0,0)")).toBe(1);
  });

  it("Zephr primary (#533afd) on white passes WCAG AA for large text (3:1)", () => {
    const ratio = contrastRatio("#533afd", "#ffffff");
    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});

describe("findClosestToken", () => {
  it("returns exact match for Zephr primary color", () => {
    const token = findClosestToken("#533afd");
    expect(token).toBe("var(--z-color-primary)");
  });

  it("returns exact match for white (#ffffff)", () => {
    const token = findClosestToken("#ffffff");
    expect(token).toBe("var(--z-color-background0)");
  });

  it("returns a var(--z-*) format string", () => {
    const token = findClosestToken("#697386");
    expect(token).toMatch(/^var\(--z-/);
  });

  it("returns fallback for invalid hex", () => {
    const token = findClosestToken("not-a-color");
    expect(token).toBe("a Zephr color token");
  });

  it("returns a string for any 6-digit hex", () => {
    const hexColors = ["#ff0000", "#00ff00", "#0000ff", "#aabbcc", "#123456"];
    for (const hex of hexColors) {
      const result = findClosestToken(hex);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    }
  });
});
