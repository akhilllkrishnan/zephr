export type AuditSeverity = "high" | "medium" | "low";
export type AuditCategory = "accessibility" | "hierarchy" | "conversion" | "trust" | "usability";

export interface UrlAuditRequest {
  url: string;
  screenshotUrl?: string;
  notes?: string;
}

export interface UrlAuditIssue {
  id: string;
  severity: AuditSeverity;
  category: AuditCategory;
  title: string;
  summary: string;
  evidence: string;
  recommendation: string;
}

export interface UrlAuditHeatmapArea {
  id: string;
  label: string;
  attention: number;
  rationale: string;
}

export interface UrlAuditReport {
  url: string;
  scannedAt: string;
  source: "cloud";
  score: number;
  status: "pass" | "warn" | "fail";
  pageTitle: string | null;
  summary: string;
  issues: UrlAuditIssue[];
  recommendations: string[];
  heatmap: UrlAuditHeatmapArea[];
}

interface FetchResponseLike {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}

type FetchLike = (input: string, init?: RequestInit) => Promise<FetchResponseLike>;

function makeIssue(input: Omit<UrlAuditIssue, "id">): UrlAuditIssue {
  return {
    id: `${input.category}-${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    ...input
  };
}

function countMatches(text: string, pattern: RegExp): number {
  return [...text.matchAll(pattern)].length;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) {
    return null;
  }
  const value = match[1].replace(/\s+/g, " ").trim();
  return value || null;
}

function extractMetaDescription(html: string): string | null {
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (!match) {
    return null;
  }
  const value = match[1].replace(/\s+/g, " ").trim();
  return value || null;
}

function scoreFromIssues(issues: UrlAuditIssue[]): number {
  let score = 100;
  for (const issue of issues) {
    if (issue.severity === "high") score -= 14;
    if (issue.severity === "medium") score -= 8;
    if (issue.severity === "low") score -= 4;
  }
  return Math.max(18, score);
}

function statusFromScore(score: number): "pass" | "warn" | "fail" {
  if (score < 60) return "fail";
  if (score < 82) return "warn";
  return "pass";
}

function buildSummary(issues: UrlAuditIssue[]): string {
  const high = issues.filter((issue) => issue.severity === "high").length;
  const medium = issues.filter((issue) => issue.severity === "medium").length;
  const low = issues.filter((issue) => issue.severity === "low").length;
  if (!issues.length) {
    return "No critical issues detected. Keep validating with real user sessions before launch.";
  }
  return `${high} high, ${medium} medium, ${low} low issues detected. Prioritize high-severity items first.`;
}

function buildRecommendations(issues: UrlAuditIssue[]): string[] {
  return issues
    .slice()
    .sort((a, b) => {
      const weight = { high: 3, medium: 2, low: 1 } as const;
      return weight[b.severity] - weight[a.severity];
    })
    .slice(0, 4)
    .map((issue) => issue.recommendation);
}

function buildHeatmap(html: string): UrlAuditHeatmapArea[] {
  const firstChunk = html.slice(0, 8000);
  const middleChunk = html.slice(8000, 22000);
  const lowerChunk = html.slice(22000);

  const heroSignals = countMatches(firstChunk, /<h1\b|<button\b|<a\b/gi);
  const midSignals = countMatches(middleChunk, /<h2\b|<button\b|<a\b|<form\b/gi);
  const footerSignals = countMatches(lowerChunk, /<a\b|<button\b|<footer\b/gi);

  const normalize = (value: number): number => Math.max(12, Math.min(95, Math.round(20 + value * 3)));

  return [
    {
      id: "hero",
      label: "Hero / first viewport",
      attention: normalize(heroSignals),
      rationale: "Heading and CTA density in top content."
    },
    {
      id: "mid",
      label: "Mid-page content",
      attention: normalize(midSignals),
      rationale: "Supporting sections, feature groups, and forms."
    },
    {
      id: "footer",
      label: "Footer and final CTA",
      attention: normalize(footerSignals),
      rationale: "End-of-page navigation and conversion reinforcement."
    }
  ];
}

export async function runUrlAudit(
  input: UrlAuditRequest,
  fetcher: FetchLike = fetch as unknown as FetchLike
): Promise<UrlAuditReport> {
  const url = input.url.trim();
  if (!/^https?:\/\//i.test(url)) {
    throw new Error("URL must start with http:// or https://");
  }

  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), 9_000);

  let html = "";
  try {
    const response = await fetcher(url, {
      redirect: "follow",
      signal: timeout.signal,
      headers: {
        "User-Agent": "Zephyr-Audit-Lite/0.1 (+https://zephyr.design)"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch target page (${response.status}).`);
    }
    html = await response.text();
  } finally {
    clearTimeout(timer);
  }

  const issues: UrlAuditIssue[] = [];
  const title = extractTitle(html);
  const description = extractMetaDescription(html);
  const hasViewport = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html);
  const hasLang = /<html[^>]*\slang=["'][^"']+["']/i.test(html);
  const hasMain = /<main[\s>]/i.test(html);
  const h1Count = countMatches(html, /<h1\b/gi);
  const navCount = countMatches(html, /<nav[\s>]/gi);
  const buttonCount = countMatches(html, /<button\b/gi);
  const linkCount = countMatches(html, /<a\b/gi);
  const imageCount = countMatches(html, /<img\b/gi);
  const imageMissingAlt = countMatches(html, /<img\b(?![^>]*\balt=["'][^"']*["'])[^>]*>/gi);
  const formControlCount = countMatches(html, /<(input|select|textarea)\b/gi);
  const labelCount = countMatches(html, /<label\b/gi);
  const ctaTextPresent = /(get started|start free|sign up|book demo|contact sales|try now|create account)/i.test(
    html.replace(/<[^>]+>/g, " ")
  );

  if (!title) {
    issues.push(
      makeIssue({
        severity: "high",
        category: "trust",
        title: "Missing page title",
        summary: "The document does not define a <title> element.",
        evidence: "No <title> tag detected in the page head.",
        recommendation: "Add a clear, unique title that reflects the page intent and search context."
      })
    );
  } else if (title.length < 18) {
    issues.push(
      makeIssue({
        severity: "low",
        category: "trust",
        title: "Title is too short",
        summary: "Very short titles reduce clarity in search and browser tabs.",
        evidence: `Detected title length: ${title.length} characters.`,
        recommendation: "Aim for a descriptive 30-60 character title for better discoverability."
      })
    );
  }

  if (!description) {
    issues.push(
      makeIssue({
        severity: "medium",
        category: "trust",
        title: "Missing meta description",
        summary: "No summary exists for search previews and social snippets.",
        evidence: "No <meta name=\"description\"> tag was found.",
        recommendation: "Add a concise 120-160 character description focused on the core value proposition."
      })
    );
  }

  if (!hasViewport) {
    issues.push(
      makeIssue({
        severity: "high",
        category: "usability",
        title: "Missing viewport meta tag",
        summary: "Mobile rendering may scale incorrectly on small screens.",
        evidence: "No viewport declaration was detected.",
        recommendation: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">."
      })
    );
  }

  if (!hasLang) {
    issues.push(
      makeIssue({
        severity: "medium",
        category: "accessibility",
        title: "Missing document language",
        summary: "Screen readers rely on html[lang] for pronunciation and voice profile.",
        evidence: "No lang attribute detected on the <html> element.",
        recommendation: "Set the primary language using <html lang=\"en\"> (or your locale)."
      })
    );
  }

  if (!hasMain) {
    issues.push(
      makeIssue({
        severity: "medium",
        category: "accessibility",
        title: "Missing <main> landmark",
        summary: "Assistive tech users lose a primary skip target.",
        evidence: "No <main> element found.",
        recommendation: "Wrap primary page content in a semantic <main> region."
      })
    );
  }

  if (h1Count === 0) {
    issues.push(
      makeIssue({
        severity: "high",
        category: "hierarchy",
        title: "No primary heading (H1)",
        summary: "Users have no clear page context anchor.",
        evidence: "No <h1> tags detected.",
        recommendation: "Add a single, explicit H1 that states the page objective."
      })
    );
  }

  if (h1Count > 1) {
    issues.push(
      makeIssue({
        severity: "medium",
        category: "hierarchy",
        title: "Multiple H1 headings",
        summary: "Competing top-level headings weaken visual and semantic hierarchy.",
        evidence: `Detected ${h1Count} <h1> elements.`,
        recommendation: "Keep one H1 and demote additional top titles to H2."
      })
    );
  }

  if (imageCount > 0 && imageMissingAlt > 0) {
    const ratio = `${imageMissingAlt}/${imageCount}`;
    issues.push(
      makeIssue({
        severity: imageMissingAlt > 2 ? "high" : "medium",
        category: "accessibility",
        title: "Images missing alt text",
        summary: "Visual content is inaccessible to screen reader users.",
        evidence: `Missing alt attributes: ${ratio} images.`,
        recommendation: "Provide meaningful alt text for informative images and empty alt for decorative ones."
      })
    );
  }

  if (formControlCount > 0 && labelCount === 0) {
    issues.push(
      makeIssue({
        severity: "high",
        category: "accessibility",
        title: "Form controls appear unlabeled",
        summary: "Inputs without labels make forms difficult to understand and complete.",
        evidence: `Detected ${formControlCount} form controls and ${labelCount} label tags.`,
        recommendation: "Associate each form control with a visible <label> or aria-label."
      })
    );
  }

  if (navCount === 0 && (buttonCount + linkCount) > 8) {
    issues.push(
      makeIssue({
        severity: "medium",
        category: "usability",
        title: "Navigation landmark not detected",
        summary: "Dense links without semantic navigation can increase orientation friction.",
        evidence: `${buttonCount} buttons and ${linkCount} links found, but no <nav> region.`,
        recommendation: "Use a semantic <nav> container for primary navigation groups."
      })
    );
  }

  if (!ctaTextPresent && (buttonCount + linkCount) > 6) {
    issues.push(
      makeIssue({
        severity: "medium",
        category: "conversion",
        title: "Primary CTA is unclear",
        summary: "Conversion intent is not explicit in action copy.",
        evidence: "No high-intent action phrases detected in visible copy.",
        recommendation: "Add one clear primary CTA near the top (e.g. Start free, Book demo, Get started)."
      })
    );
  }

  if (!input.screenshotUrl) {
    issues.push(
      makeIssue({
        severity: "low",
        category: "usability",
        title: "No screenshot context provided",
        summary: "Visual-only issues are harder to catch without a screenshot reference.",
        evidence: "Request omitted screenshotUrl.",
        recommendation: "Attach a screenshot URL to improve layout and visual hierarchy diagnostics."
      })
    );
  }

  const score = scoreFromIssues(issues);
  const status = statusFromScore(score);

  return {
    url,
    scannedAt: new Date().toISOString(),
    source: "cloud",
    score,
    status,
    pageTitle: title,
    summary: buildSummary(issues),
    issues,
    recommendations: buildRecommendations(issues),
    heatmap: buildHeatmap(html)
  };
}
