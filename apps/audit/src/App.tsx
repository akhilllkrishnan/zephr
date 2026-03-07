import { useEffect, useMemo, useRef, useState } from "react";
import { ZephrCloudClient } from "@zephrui/cloud-sdk";
import { createLocalAuditReport } from "./auditLite";
import type { UrlAuditReport, UrlAuditIssue } from "@zephrui/cloud-sdk";

type ResultTab = "issues" | "heatmap" | "prompt";

// ─── Severity badge colors ────────────────────────────────────────────────────
function severityColor(severity: UrlAuditIssue["severity"]): string {
  if (severity === "high")   return "#ef4444";
  if (severity === "medium") return "#f59e0b";
  return "#6b7280";
}

function severityBg(severity: UrlAuditIssue["severity"]): string {
  if (severity === "high")   return "rgba(239,68,68,0.10)";
  if (severity === "medium") return "rgba(245,158,11,0.10)";
  return "rgba(107,114,128,0.10)";
}

function scoreColor(score: number): string {
  if (score >= 82) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

// ─── AI fix prompt builder ────────────────────────────────────────────────────
function buildAiPrompt(report: UrlAuditReport, notes: string): string {
  const lines: string[] = [
    `You are a senior UX consultant. I need you to help me fix UX issues on this page: ${report.url}`,
    "",
    `Page goal: ${notes || "(not specified)"}`,
    `Overall UX score: ${report.score}/100 — ${report.status.toUpperCase()}`,
    "",
    `Summary: ${report.summary}`,
    "",
    `Issues found (${report.issues.length}):`,
  ];
  for (const issue of report.issues) {
    lines.push(`\n[${issue.severity.toUpperCase()}] ${issue.title}`);
    lines.push(`  Evidence: ${issue.evidence}`);
    lines.push(`  Recommendation: ${issue.recommendation}`);
  }
  lines.push("");
  lines.push("Please provide:");
  lines.push("1. A prioritized action plan to fix the top 3 issues");
  lines.push("2. Specific UI/copy changes with before/after examples");
  lines.push("3. Any additional patterns I should consider for this type of page");
  return lines.join("\n");
}

export default function App() {
  // ── Theme ──────────────────────────────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ── Scan inputs ────────────────────────────────────────────────────────────
  const [auditUrl, setAuditUrl] = useState("");
  const [auditScreenshotUrl, setAuditScreenshotUrl] = useState("");
  const [auditNotes, setAuditNotes] = useState("");
  const [cloudApiKeyDraft, setCloudApiKeyDraft] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephr-cloud-api-key") ?? "" : ""
  );
  const [cloudApiKey, setCloudApiKey] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephr-cloud-api-key") ?? "" : ""
  );
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ── Scan state ─────────────────────────────────────────────────────────────
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditReport, setAuditReport] = useState<UrlAuditReport | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  // ── Results tab ────────────────────────────────────────────────────────────
  const [resultTab, setResultTab] = useState<ResultTab>("issues");
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const [toastMessage, setToastMessage] = useState("");
  const toastRef = useRef<number | null>(null);
  function showToast(msg: string) {
    setToastMessage(msg);
    if (toastRef.current !== null) window.clearTimeout(toastRef.current);
    toastRef.current = window.setTimeout(() => setToastMessage(""), 2200);
  }

  // ── AI prompt ──────────────────────────────────────────────────────────────
  const aiPrompt = useMemo(() => {
    if (!auditReport) return "";
    return buildAiPrompt(auditReport, auditNotes);
  }, [auditReport, auditNotes]);

  // ── Scan actions ───────────────────────────────────────────────────────────
  function saveCloudApiKey() {
    sessionStorage.setItem("zephr-cloud-api-key", cloudApiKeyDraft);
    setCloudApiKey(cloudApiKeyDraft);
    showToast("API key saved for this session");
  }
  function clearCloudApiKey() {
    sessionStorage.removeItem("zephr-cloud-api-key");
    setCloudApiKey("");
    setCloudApiKeyDraft("");
    showToast("Cloud API key cleared — using local scanner");
  }

  function startProgressAnimation() {
    setScanProgress(0);
    let p = 0;
    progressIntervalRef.current = window.setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 90) {
        setScanProgress(90);
        if (progressIntervalRef.current !== null) {
          window.clearInterval(progressIntervalRef.current);
        }
        return;
      }
      setScanProgress(p);
    }, 220);
  }

  function stopProgressAnimation(success: boolean) {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setScanProgress(success ? 100 : 0);
    if (success) {
      window.setTimeout(() => setScanProgress(0), 800);
    }
  }

  async function runAudit() {
    const url = auditUrl.trim();
    if (!url) { setAuditError("Please enter a URL to scan."); return; }
    if (!/^https?:\/\/.+/.test(url)) { setAuditError("Please enter a valid URL starting with http:// or https://"); return; }

    setAuditError("");
    setAuditLoading(true);
    setAuditReport(null);
    setResultTab("issues");
    setExpandedIssueId(null);
    startProgressAnimation();

    try {
      let report: UrlAuditReport;
      if (cloudApiKey) {
        const client = new ZephrCloudClient({ baseUrl: "https://api.zephrui.com", apiKey: cloudApiKey });
        report = await client.runUrlAudit({ url, screenshotUrl: auditScreenshotUrl || undefined, notes: auditNotes || undefined });
      } else {
        // Simulate a small delay for the local scanner to feel responsive
        await new Promise<void>((resolve) => window.setTimeout(resolve, 900));
        report = createLocalAuditReport({ url, screenshotUrl: auditScreenshotUrl || undefined, notes: auditNotes || undefined });
      }
      stopProgressAnimation(true);
      setAuditReport(report);
    } catch (err) {
      stopProgressAnimation(false);
      const msg = err instanceof Error ? err.message : "Scan failed. Please try again.";
      setAuditError(msg);
    } finally {
      setAuditLoading(false);
    }
  }

  // ── Score gauge arc helpers ────────────────────────────────────────────────
  const GAUGE_R = 44;
  const GAUGE_CX = 60;
  const GAUGE_CY = 60;
  const circumference = 2 * Math.PI * GAUGE_R;

  function scoreArcDash(score: number) {
    const pct = Math.min(score / 100, 1);
    const dash = circumference * pct;
    return `${dash} ${circumference - dash}`;
  }

  return (
    <div className="audit-shell">
      {/* ── Header ── */}
      <header className="audit-header">
        {/* Brand */}
        <div className="audit-brand">
          <span className="audit-brand-name">Zephr Audit</span>
          <span className="audit-alpha-badge">Alpha</span>
        </div>

        {/* Dark mode toggle */}
        <button
          type="button"
          className="audit-icon-btn"
          onClick={() => setDarkMode((d) => !d)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="ms">{darkMode ? "light_mode" : "dark_mode"}</span>
        </button>
      </header>

      {/* ── Progress bar ── */}
      {auditLoading && (
        <div className="audit-progress-track">
          <div
            className="audit-progress-bar"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
      )}

      {/* ── Main content ── */}
      <main className="audit-main">
        {/* Scanner card */}
        <section className="audit-scanner-card">
          <div className="audit-scanner-header">
            <span className="ms audit-scanner-icon">search</span>
            <div>
              <h1 className="audit-scanner-title">Scan a URL for UX issues</h1>
              <p className="audit-scanner-sub">
                {cloudApiKey
                  ? "Cloud scanner active — full DOM analysis enabled"
                  : "Running local heuristic scanner — add an API key for full cloud analysis"}
              </p>
            </div>
          </div>

          <div className="audit-url-row">
            <input
              className="audit-url-input"
              type="url"
              value={auditUrl}
              onChange={(e) => setAuditUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") runAudit(); }}
              placeholder="https://your-product.com"
              aria-label="URL to audit"
              disabled={auditLoading}
            />
            <button
              type="button"
              className="audit-scan-btn"
              onClick={runAudit}
              disabled={auditLoading || !auditUrl.trim()}
            >
              {auditLoading ? (
                <span className="audit-scan-spinner" />
              ) : (
                <>
                  <span className="ms">play_arrow</span>
                  Scan
                </>
              )}
            </button>
          </div>

          {auditError && (
            <p className="audit-error">{auditError}</p>
          )}

          {/* Advanced options */}
          <button
            type="button"
            className="audit-advanced-toggle"
            onClick={() => setShowAdvanced((v) => !v)}
            aria-expanded={showAdvanced}
          >
            <span className="ms" style={{ fontSize: "0.85rem", transition: "transform 180ms", transform: showAdvanced ? "rotate(90deg)" : "none" }}>chevron_right</span>
            Advanced options
          </button>

          {showAdvanced && (
            <div className="audit-advanced-fields">
              <div className="audit-field">
                <label className="audit-field-label" htmlFor="screenshot-url">Screenshot URL <span className="audit-field-opt">(optional)</span></label>
                <input
                  id="screenshot-url"
                  className="audit-field-input"
                  type="url"
                  value={auditScreenshotUrl}
                  onChange={(e) => setAuditScreenshotUrl(e.target.value)}
                  placeholder="https://cdn.example.com/screenshot.png"
                  disabled={auditLoading}
                />
              </div>
              <div className="audit-field">
                <label className="audit-field-label" htmlFor="audit-notes">Page goal <span className="audit-field-opt">(optional)</span></label>
                <input
                  id="audit-notes"
                  className="audit-field-input"
                  type="text"
                  value={auditNotes}
                  onChange={(e) => setAuditNotes(e.target.value)}
                  placeholder="e.g. Increase trial signups"
                  disabled={auditLoading}
                />
              </div>
              <div className="audit-field">
                <label className="audit-field-label" htmlFor="cloud-key">
                  Cloud API key <span className="audit-field-opt">(optional)</span>
                </label>
                <div className="audit-key-row">
                  <input
                    id="cloud-key"
                    className="audit-field-input"
                    type="password"
                    value={cloudApiKeyDraft}
                    onChange={(e) => setCloudApiKeyDraft(e.target.value)}
                    placeholder="zk_..."
                    disabled={auditLoading}
                  />
                  {cloudApiKey ? (
                    <button type="button" className="audit-key-action audit-key-action--clear" onClick={clearCloudApiKey}>Clear</button>
                  ) : (
                    <button type="button" className="audit-key-action" onClick={saveCloudApiKey} disabled={!cloudApiKeyDraft.trim()}>Save</button>
                  )}
                </div>
                <p className="audit-field-hint">
                  {cloudApiKey ? "✓ Cloud key active — full DOM scan enabled" : "Without a key, local heuristic scan runs instead"}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Results */}
        {auditReport && (
          <section className="audit-results" style={{ animation: "results-in 280ms cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Score + summary row */}
            <div className="audit-results-header">
              {/* Score gauge */}
              <div className="audit-score-wrap">
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ overflow: "visible" }}>
                  {/* Track */}
                  <circle
                    cx={GAUGE_CX}
                    cy={GAUGE_CY}
                    r={GAUGE_R}
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="8"
                  />
                  {/* Arc */}
                  <circle
                    cx={GAUGE_CX}
                    cy={GAUGE_CY}
                    r={GAUGE_R}
                    fill="none"
                    stroke={scoreColor(auditReport.score)}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={scoreArcDash(auditReport.score)}
                    strokeDashoffset="0"
                    transform={`rotate(-90 ${GAUGE_CX} ${GAUGE_CY})`}
                    style={{ transition: "stroke-dasharray 800ms cubic-bezier(0.34,1.56,0.64,1)" }}
                  />
                  <text
                    x={GAUGE_CX}
                    y={GAUGE_CY + 6}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="700"
                    fill={scoreColor(auditReport.score)}
                    fontFamily="system-ui,-apple-system,sans-serif"
                  >
                    {auditReport.score}
                  </text>
                </svg>
                <p className="audit-score-label" style={{ color: scoreColor(auditReport.score) }}>
                  {auditReport.status.toUpperCase()}
                </p>
              </div>

              {/* Summary */}
              <div className="audit-summary-col">
                <p className="audit-summary-url">{auditReport.url}</p>
                <p className="audit-summary-text">{auditReport.summary}</p>
                <p className="audit-summary-meta">
                  {auditReport.source === "cloud" ? "☁ Cloud scan" : "⚙ Local scan"} · {auditReport.issues.length} issue{auditReport.issues.length !== 1 ? "s" : ""} found · {new Date(auditReport.scannedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Result tabs */}
            <div className="audit-tabs" role="tablist">
              {(["issues", "heatmap", "prompt"] as ResultTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  className={`audit-tab ${resultTab === tab ? "is-active" : ""}`}
                  onClick={() => setResultTab(tab)}
                  aria-selected={resultTab === tab}
                >
                  {tab === "issues" && `Issues (${auditReport.issues.length})`}
                  {tab === "heatmap" && "Heatmap"}
                  {tab === "prompt" && "AI Prompt"}
                </button>
              ))}
            </div>

            {/* Issues tab */}
            {resultTab === "issues" && (
              <div className="audit-tab-panel" role="tabpanel">
                {auditReport.issues.length === 0 ? (
                  <div className="audit-no-issues">
                    <span className="ms" style={{ fontSize: "2rem", color: "#22c55e" }}>check_circle</span>
                    <p>No issues detected in this scan.</p>
                  </div>
                ) : (
                  <div className="audit-issue-list">
                    {auditReport.issues.map((issue) => (
                      <div
                        key={issue.id}
                        className={`audit-issue-card ${expandedIssueId === issue.id ? "is-expanded" : ""}`}
                      >
                        <button
                          type="button"
                          className="audit-issue-header"
                          onClick={() => setExpandedIssueId(expandedIssueId === issue.id ? null : issue.id)}
                          aria-expanded={expandedIssueId === issue.id}
                        >
                          <span
                            className="audit-issue-severity"
                            style={{ background: severityBg(issue.severity), color: severityColor(issue.severity) }}
                          >
                            {issue.severity}
                          </span>
                          <span className="audit-issue-title">{issue.title}</span>
                          <span className="audit-issue-category">{issue.category}</span>
                          <span className="ms audit-issue-chevron">
                            {expandedIssueId === issue.id ? "expand_less" : "expand_more"}
                          </span>
                        </button>
                        {expandedIssueId === issue.id && (
                          <div className="audit-issue-body">
                            <p className="audit-issue-summary">{issue.summary}</p>
                            <div className="audit-issue-detail">
                              <span className="audit-issue-detail-label">Evidence</span>
                              <p className="audit-issue-detail-text">{issue.evidence}</p>
                            </div>
                            <div className="audit-issue-detail">
                              <span className="audit-issue-detail-label">Recommendation</span>
                              <p className="audit-issue-detail-text">{issue.recommendation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Heatmap tab */}
            {resultTab === "heatmap" && (
              <div className="audit-tab-panel" role="tabpanel">
                <div className="audit-heatmap-list">
                  {auditReport.heatmap.map((area) => (
                    <div key={area.id} className="audit-heatmap-row">
                      <div className="audit-heatmap-meta">
                        <span className="audit-heatmap-label">{area.label}</span>
                        <span className="audit-heatmap-pct" style={{ color: area.attention >= 70 ? "#22c55e" : area.attention >= 45 ? "#f59e0b" : "#ef4444" }}>
                          {area.attention}%
                        </span>
                      </div>
                      <div className="audit-heatmap-track">
                        <div
                          className="audit-heatmap-fill"
                          style={{
                            width: `${area.attention}%`,
                            background: area.attention >= 70 ? "#22c55e" : area.attention >= 45 ? "#f59e0b" : "#ef4444",
                            transition: "width 700ms cubic-bezier(0.34,1.56,0.64,1)"
                          }}
                        />
                      </div>
                      <p className="audit-heatmap-rationale">{area.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Prompt tab */}
            {resultTab === "prompt" && (
              <div className="audit-tab-panel" role="tabpanel">
                <div className="audit-prompt-wrap">
                  <div className="audit-prompt-toolbar">
                    <span className="audit-prompt-hint">Paste this into Claude, Codex, or ChatGPT</span>
                    <button
                      type="button"
                      className="audit-copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(aiPrompt).then(() => showToast("Prompt copied!"));
                      }}
                    >
                      <span className="ms">content_copy</span>
                      Copy prompt
                    </button>
                  </div>
                  <pre className="audit-prompt-pre">{aiPrompt}</pre>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Toast */}
      {toastMessage && (
        <p className="audit-toast" role="status" aria-live="polite">{toastMessage}</p>
      )}
    </div>
  );
}
