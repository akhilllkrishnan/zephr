/**
 * Unit tests for createLocalAuditReport — the pure-logic audit engine.
 * No DOM, no React, no external deps needed.
 */

import { createLocalAuditReport } from "../auditLite";

describe("createLocalAuditReport", () => {
  describe("structure", () => {
    it("returns a report with required fields", () => {
      const report = createLocalAuditReport({ url: "https://example.com" });
      expect(report).toMatchObject({
        url: "https://example.com",
        source: "local",
      });
      expect(typeof report.score).toBe("number");
      expect(typeof report.scannedAt).toBe("string");
      expect(Array.isArray(report.issues)).toBe(true);
      expect(Array.isArray(report.recommendations)).toBe(true);
      expect(Array.isArray(report.heatmap)).toBe(true);
    });

    it("always returns 3 heatmap sections", () => {
      const report = createLocalAuditReport({ url: "https://example.com" });
      expect(report.heatmap).toHaveLength(3);
    });

    it("normalizes URL whitespace", () => {
      const report = createLocalAuditReport({ url: "  https://example.com  " });
      expect(report.url).toBe("https://example.com");
    });
  });

  describe("scoring", () => {
    it("score is in range [24, 100]", () => {
      const cases = [
        "https://example.com",
        "https://example.com/landing",
        "https://app.example.com/dashboard",
        "https://example.com/checkout",
      ];
      for (const url of cases) {
        const report = createLocalAuditReport({ url });
        expect(report.score).toBeGreaterThanOrEqual(24);
        expect(report.score).toBeLessThanOrEqual(100);
      }
    });

    it("status is pass when score ≥ 82", () => {
      const report = createLocalAuditReport({
        url: "https://example.com",
        screenshotUrl: "https://example.com/screenshot.png",
        notes: "Signup form page",
      });
      // With screenshot + notes: no extra issues → score starts at 100
      expect(report.score).toBe(100);
      expect(report.status).toBe("pass");
    });

    it("checkout URL triggers a high-severity issue", () => {
      const report = createLocalAuditReport({
        url: "https://example.com/checkout",
        screenshotUrl: "https://example.com/screenshot.png",
        notes: "Payment flow",
      });
      const highIssues = report.issues.filter((i) => i.severity === "high");
      expect(highIssues.length).toBeGreaterThanOrEqual(1);
    });

    it("landing URL triggers at least one medium-severity issue", () => {
      const report = createLocalAuditReport({
        url: "https://example.com/landing",
        screenshotUrl: "https://example.com/screenshot.png",
        notes: "Campaign page",
      });
      const mediumIssues = report.issues.filter((i) => i.severity === "medium");
      expect(mediumIssues.length).toBeGreaterThanOrEqual(1);
    });

    it("missing screenshot adds a medium issue", () => {
      const report = createLocalAuditReport({
        url: "https://example.com",
        notes: "Some notes",
      });
      const screenshotIssue = report.issues.find((i) =>
        i.title.toLowerCase().includes("screenshot")
      );
      expect(screenshotIssue).toBeDefined();
      expect(screenshotIssue?.severity).toBe("medium");
    });

    it("missing notes adds a low-severity issue", () => {
      const report = createLocalAuditReport({
        url: "https://example.com",
        screenshotUrl: "https://example.com/screenshot.png",
      });
      const notesIssue = report.issues.find((i) =>
        i.title.toLowerCase().includes("goal") || i.title.toLowerCase().includes("context")
      );
      expect(notesIssue).toBeDefined();
      expect(notesIssue?.severity).toBe("low");
    });
  });

  describe("issue IDs", () => {
    it("all issue IDs are unique within a report", () => {
      const report = createLocalAuditReport({
        url: "https://example.com/landing/checkout",
      });
      const ids = report.issues.map((i) => i.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it("issue IDs are slug-formatted (no spaces, lowercase)", () => {
      const report = createLocalAuditReport({
        url: "https://example.com/landing/checkout",
      });
      for (const issue of report.issues) {
        expect(issue.id).toMatch(/^[a-z0-9-]+$/);
      }
    });
  });

  describe("recommendations", () => {
    it("recommendations count does not exceed 4", () => {
      const report = createLocalAuditReport({
        url: "https://example.com/landing/checkout",
      });
      expect(report.recommendations.length).toBeLessThanOrEqual(4);
    });

    it("each recommendation is a non-empty string", () => {
      const report = createLocalAuditReport({
        url: "https://example.com/landing/checkout",
      });
      for (const rec of report.recommendations) {
        expect(typeof rec).toBe("string");
        expect(rec.length).toBeGreaterThan(0);
      }
    });
  });
});
