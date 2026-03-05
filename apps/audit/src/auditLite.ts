import type { UrlAuditIssue, UrlAuditReport } from "@zephyr/cloud-sdk";

function issue(input: Omit<UrlAuditIssue, "id">): UrlAuditIssue {
  return {
    id: `${input.category}-${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    ...input
  };
}

function scoreFromIssues(issues: UrlAuditIssue[]): number {
  let score = 100;
  for (const current of issues) {
    if (current.severity === "high") score -= 14;
    if (current.severity === "medium") score -= 8;
    if (current.severity === "low") score -= 4;
  }
  return Math.max(24, score);
}

export function createLocalAuditReport(input: {
  url: string;
  screenshotUrl?: string;
  notes?: string;
}): UrlAuditReport {
  const normalizedUrl = input.url.trim();
  const notes = input.notes?.trim().toLowerCase() ?? "";
  const issues: UrlAuditIssue[] = [];

  if (!input.screenshotUrl?.trim()) {
    issues.push(
      issue({
        severity: "medium",
        category: "usability",
        title: "No screenshot supplied",
        summary: "Layout and spacing diagnostics are weaker without a visual frame.",
        evidence: "Request did not include screenshot URL.",
        recommendation: "Attach a screenshot URL so the audit can check visual hierarchy and spacing."
      })
    );
  }

  if (!notes) {
    issues.push(
      issue({
        severity: "low",
        category: "conversion",
        title: "No product goal context",
        summary: "UX recommendations are generic without task intent.",
        evidence: "Notes field is empty.",
        recommendation: "Add one sentence with your primary goal (signup, checkout, lead capture, etc.)."
      })
    );
  }

  if (/landing|home|marketing/.test(normalizedUrl)) {
    issues.push(
      issue({
        severity: "medium",
        category: "conversion",
        title: "Primary CTA hierarchy likely weak",
        summary: "Landing pages need one dominant primary action above the fold.",
        evidence: "URL suggests a top-of-funnel page.",
        recommendation: "Ensure one primary CTA has highest visual contrast and appears in the first viewport."
      })
    );
  }

  if (/dashboard|app/.test(normalizedUrl)) {
    issues.push(
      issue({
        severity: "medium",
        category: "hierarchy",
        title: "Information density risk",
        summary: "App pages often overload first viewport with metrics and controls.",
        evidence: "URL suggests an internal product surface.",
        recommendation: "Group content into clear sections and reduce first-screen cognitive load."
      })
    );
  }

  if (/checkout|payment|billing/.test(normalizedUrl)) {
    issues.push(
      issue({
        severity: "high",
        category: "trust",
        title: "Conversion-critical trust signals",
        summary: "Payment flows must emphasize security, error states, and clear recovery actions.",
        evidence: "URL suggests payment-sensitive workflow.",
        recommendation: "Expose clear security messaging, inline validation, and recovery links for failed payments."
      })
    );
  }

  const score = scoreFromIssues(issues);
  const status = score < 60 ? "fail" : score < 82 ? "warn" : "pass";
  const summary = issues.length
    ? `Lite audit found ${issues.length} heuristic issues. Connect cloud scanner for full DOM-based analysis.`
    : "No major heuristic issues detected in lite mode.";

  return {
    url: normalizedUrl,
    scannedAt: new Date().toISOString(),
    source: "local",
    score,
    status,
    pageTitle: null,
    summary,
    issues,
    recommendations: issues.slice(0, 4).map((current) => current.recommendation),
    heatmap: [
      {
        id: "hero",
        label: "Hero / first viewport",
        attention: 82,
        rationale: "Primary heading and CTA location drive first-pass attention."
      },
      {
        id: "content",
        label: "Middle content",
        attention: 56,
        rationale: "Secondary information is often skimmed unless grouped with clear subheadings."
      },
      {
        id: "footer",
        label: "Footer / final CTA",
        attention: 28,
        rationale: "Late-page sections have lower attention unless they reinforce trust and action."
      }
    ]
  };
}
