import { useState, useRef, useEffect, useMemo, useCallback, type FormEvent } from "react";
import { Button } from "@zephyr/ui-react";
import { Badge } from "@zephyr/ui-react";
import { Alert } from "@zephyr/ui-react";
import { Input } from "@zephyr/ui-react";
import { Textarea } from "@zephyr/ui-react";
import { ZephyrCloudClient } from "@zephyr/cloud-sdk";
import type { UrlAuditReport, UrlAuditSeverity } from "@zephyr/cloud-sdk";
import { createLocalAuditReport } from "./auditLite";

// ─── Types ────────────────────────────────────────────────────

type ResultTab = "issues" | "heatmap" | "prompt";

// ─── Zephyr App Switcher ──────────────────────────────────────

const ZEPHYR_APPS = [
  { id: "ui",    name: "UI",    icon: "widgets",       tagline: "Component library", status: "active" as const, url: "http://localhost:4172" },
  { id: "audit", name: "Audit", icon: "manage_search", tagline: "UX scanner",        status: "active" as const, url: null },
  { id: "proto", name: "Proto", icon: "bolt",          tagline: "AI page builder",   status: "soon"   as const, url: null },
  { id: "copy",  name: "Copy",  icon: "edit_note",     tagline: "Microcopy AI",      status: "soon"   as const, url: null },
  { id: "brand", name: "Brand", icon: "palette",       tagline: "Brand token gen",   status: "soon"   as const, url: null },
  { id: "flow",  name: "Flow",  icon: "account_tree",  tagline: "Journey mapper",    status: "soon"   as const, url: null },
] as const;

type ZephyrApp = typeof ZEPHYR_APPS[number];

function AppSwitcher({ currentAppId = "audit" }: { currentAppId?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="app-switcher" ref={ref}>
      <button
        type="button"
        className={`app-switcher-trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch Zephyr app"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="app-switcher-dots" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="app-switcher-dot" />
          ))}
        </span>
      </button>

      {open && (
        <>
          <div className="app-switcher-backdrop" onClick={() => setOpen(false)} />
          <div className="app-switcher-panel" role="dialog" aria-label="Zephyr apps">
            <p className="app-switcher-heading">Zephyr Suite</p>
            <div className="app-switcher-grid">
              {ZEPHYR_APPS.map((app: ZephyrApp, i) => {
                const isActive = app.id === currentAppId;
                const isSoon = app.status === "soon";
                return (
                  <button
                    key={app.id}
                    type="button"
                    className={`app-card ${isActive ? "is-active" : ""} ${isSoon ? "is-soon" : ""}`}
                    style={{ "--card-delay": `${i * 40}ms` } as React.CSSProperties}
                    disabled={isSoon}
                    title={isSoon ? "Coming soon" : app.name}
                    onClick={() => {
                      if (app.url) window.location.href = app.url;
                      setOpen(false);
                    }}
                  >
                    <span className="app-card-icon ms">{app.icon}</span>
                    <span className="app-card-name">{app.name}</span>
                    <span className="app-card-tagline">{app.tagline}</span>
                    {isActive && <span className="app-card-badge is-active-badge">Active</span>}
                    {isSoon && <span className="app-card-badge is-soon-badge">Soon</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────

function severityBadgeTone(severity: UrlAuditSeverity): "danger" | "info" | "neutral" {
  if (severity === "high") return "danger";
  if (severity === "medium") return "info";
  return "neutral";
}

// ─── Score Ring Component ─────────────────────────────────────

function ScoreRing({ score, status }: { score: number; status: string }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = status === "pass" ? "var(--color-success)" : status === "warn" ? "var(--color-warning)" : "var(--color-danger)";

  return (
    <div className="score-ring-wrap" aria-label={`Score: ${score} out of 100`}>
      <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
        <circle cx="56" cy="56" r={r} stroke="var(--line)" strokeWidth="8" />
        <circle
          cx="56" cy="56" r={r}
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 56 56)"
          className="score-ring-arc"
        />
      </svg>
      <div className="score-ring-inner">
        <span className="score-ring-value">{score}</span>
        <span className="score-ring-label">/ 100</span>
      </div>
    </div>
  );
}

// ─── Scan Progress Bar ────────────────────────────────────────

function ScanProgress({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="scan-progress" role="progressbar" aria-label="Scanning…">
      <div className="scan-progress-bar" />
    </div>
  );
}

// ─── Issue Card ───────────────────────────────────────────────

function IssueCard({ issue }: { issue: UrlAuditReport["issues"][number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={`audit-issue-card ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="audit-issue-summary"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className="audit-issue-head">
          <Badge tone={severityBadgeTone(issue.severity)}>{issue.severity.toUpperCase()}</Badge>
          <span className="audit-issue-category">{issue.category}</span>
        </div>
        <div className="audit-issue-title-row">
          <span className="audit-issue-title">{issue.title}</span>
          <span className="audit-issue-chevron ms">{expanded ? "expand_less" : "expand_more"}</span>
        </div>
      </button>
      {expanded && (
        <div className="audit-issue-body">
          <p className="audit-issue-text">{issue.summary}</p>
          <p className="audit-issue-evidence"><strong>Evidence:</strong> {issue.evidence}</p>
          <p className="audit-issue-recommendation"><strong>Fix:</strong> {issue.recommendation}</p>
        </div>
      )}
    </article>
  );
}

// ─── Toast ────────────────────────────────────────────────────

function Toast({ message }: { message: string }) {
  if (!message) return null;
  return <div className="toast is-visible">{message}</div>;
}

// ─── Main App ─────────────────────────────────────────────────

const CLOUD_BASE_URL =
  (import.meta.env.VITE_ZEPHYR_CLOUD_URL as string | undefined)?.trim() ||
  "http://localhost:4177";

export default function AuditApp() {
  // theme
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // toast
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current !== null) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 2200);
  }, []);

  // cloud api key
  const [cloudApiKey, setCloudApiKey] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephyr-cloud-api-key") ?? "" : ""
  );
  const [cloudApiKeyDraft, setCloudApiKeyDraft] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephyr-cloud-api-key") ?? "" : ""
  );

  useEffect(() => {
    if (cloudApiKey.trim()) {
      sessionStorage.setItem("zephyr-cloud-api-key", cloudApiKey.trim());
    } else {
      sessionStorage.removeItem("zephyr-cloud-api-key");
    }
  }, [cloudApiKey]);

  const cloudClient = useMemo(() => {
    const key = cloudApiKey.trim();
    if (!key) return null;
    return new ZephyrCloudClient({ apiKey: key, baseUrl: CLOUD_BASE_URL });
  }, [cloudApiKey]);

  // audit state
  const [auditUrl, setAuditUrl] = useState("https://example.com");
  const [auditScreenshotUrl, setAuditScreenshotUrl] = useState("");
  const [auditNotes, setAuditNotes] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditReport, setAuditReport] = useState<UrlAuditReport | null>(null);
  const [resultTab, setResultTab] = useState<ResultTab>("issues");
  const [showApiKey, setShowApiKey] = useState(false);

  // derived
  const auditFixPrompt = useMemo(() => {
    if (!auditReport) return "";
    const lines = auditReport.issues.slice(0, 6).map(
      (issue, index) =>
        `${index + 1}. [${issue.severity.toUpperCase()} | ${issue.category}] ${issue.title}: ${issue.recommendation}`
    );
    return [
      `Audit target: ${auditReport.url}`,
      `Score: ${auditReport.score}/100 (${auditReport.status})`,
      "",
      "Apply these fixes in priority order:",
      ...lines,
      "",
      "Constraints:",
      "- Keep semantics and accessibility first (labels, landmarks, heading hierarchy).",
      "- Preserve visual consistency with Zephyr components.",
      "",
      "Return:",
      "1) Updated UI code",
      "2) Short changelog of UX improvements",
      "3) Any unresolved assumptions"
    ].join("\n");
  }, [auditReport]);

  // handlers
  function saveCloudApiKey(): void {
    const next = cloudApiKeyDraft.trim();
    setCloudApiKey(next);
    showToast(next ? "Cloud API key saved" : "Cloud API key cleared");
  }

  function clearCloudApiKey(): void {
    setCloudApiKey("");
    setCloudApiKeyDraft("");
    showToast("Cloud key removed. Using local fallback.");
  }

  async function runAudit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const url = auditUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      setAuditError("Enter a valid public URL starting with http:// or https://.");
      setAuditReport(null);
      return;
    }

    setAuditLoading(true);
    setAuditError("");
    setAuditReport(null);

    try {
      if (!cloudClient) {
        const report = createLocalAuditReport({
          url,
          screenshotUrl: auditScreenshotUrl.trim() || undefined,
          notes: auditNotes.trim() || undefined
        });
        setAuditReport(report);
        setResultTab("issues");
        showToast("Audit completed — local lite mode");
        return;
      }

      const report = await cloudClient.runUrlAudit({
        url,
        screenshotUrl: auditScreenshotUrl.trim() || undefined,
        notes: auditNotes.trim() || undefined
      });
      setAuditReport(report);
      setResultTab("issues");
      showToast("Audit completed — cloud scanner");
    } catch (error) {
      const fallback = createLocalAuditReport({
        url,
        screenshotUrl: auditScreenshotUrl.trim() || undefined,
        notes: auditNotes.trim() || undefined
      });
      setAuditReport(fallback);
      setResultTab("issues");
      const message = error instanceof Error ? error.message : String(error);
      setAuditError(`${message}. Showing local lite audit as fallback.`);
    } finally {
      setAuditLoading(false);
    }
  }

  async function copyPrompt(): Promise<void> {
    if (!auditFixPrompt) return;
    try {
      await navigator.clipboard.writeText(auditFixPrompt);
      showToast("AI prompt copied to clipboard");
    } catch {
      showToast("Copy failed — try manually selecting the text");
    }
  }

  return (
    <>
      {/* ── Header ─────────────────────────────────────── */}
      <header className="audit-header">
        <div className="audit-header-left">
          <AppSwitcher currentAppId="audit" />
          <div className="audit-brand">
            <span className="audit-brand-name">Zephyr Audit</span>
            <span className="audit-brand-badge">Alpha</span>
          </div>
        </div>
        <div className="audit-header-right">
          <span className="audit-cloud-status">
            {cloudClient ? (
              <span className="status-dot is-active" title="Cloud scanner active" />
            ) : (
              <span className="status-dot" title="Local lite mode" />
            )}
            {cloudClient ? "Cloud" : "Lite mode"}
          </span>
          <button
            type="button"
            className="icon-btn ms"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "light_mode" : "dark_mode"}
          </button>
        </div>
      </header>

      {/* ── Scan progress bar ──────────────────────────── */}
      <ScanProgress active={auditLoading} />

      {/* ── Main layout ───────────────────────────────── */}
      <main className="audit-main">
        {/* ── Scanner panel ──────────────────────────── */}
        <section className="scanner-panel">
          <div className="scanner-panel-header">
            <span className="ms scanner-icon">manage_search</span>
            <h1 className="scanner-title">UX Scanner</h1>
            <p className="scanner-subtitle">Paste a URL and get prioritized UX issues with AI-ready fixes.</p>
          </div>

          <form className="scanner-form" onSubmit={runAudit}>
            <div className="scanner-field">
              <label htmlFor="audit-url" className="scanner-label">Page URL</label>
              <Input
                id="audit-url"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                placeholder="https://your-product.com/pricing"
                required
              />
            </div>

            <details className="scanner-extras">
              <summary className="scanner-extras-toggle">Advanced options</summary>
              <div className="scanner-extras-body">
                <div className="scanner-field">
                  <label htmlFor="audit-screenshot" className="scanner-label">Screenshot URL <span className="scanner-label-opt">(optional)</span></label>
                  <Input
                    id="audit-screenshot"
                    value={auditScreenshotUrl}
                    onChange={(e) => setAuditScreenshotUrl(e.target.value)}
                    placeholder="https://cdn.yourapp.com/screen.png"
                  />
                </div>

                <div className="scanner-field">
                  <label htmlFor="audit-notes" className="scanner-label">Page goal <span className="scanner-label-opt">(optional)</span></label>
                  <Textarea
                    id="audit-notes"
                    rows={3}
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    placeholder="Example: Improve onboarding conversion for first-time users."
                  />
                </div>

                <div className="scanner-field">
                  <div className="scanner-label-row">
                    <label htmlFor="audit-apikey" className="scanner-label">Cloud API key <span className="scanner-label-opt">(optional)</span></label>
                    <Badge tone={cloudClient ? "success" : "neutral"} size="sm">
                      {cloudClient ? "Cloud active" : "Local mode"}
                    </Badge>
                  </div>
                  <div className="scanner-key-row">
                    <Input
                      id="audit-apikey"
                      type={showApiKey ? "text" : "password"}
                      value={cloudApiKeyDraft}
                      onChange={(e) => setCloudApiKeyDraft(e.target.value)}
                      placeholder="dev_local_key"
                    />
                    <button
                      type="button"
                      className="icon-btn ms"
                      onClick={() => setShowApiKey((s) => !s)}
                      aria-label={showApiKey ? "Hide key" : "Show key"}
                    >
                      {showApiKey ? "visibility_off" : "visibility"}
                    </button>
                  </div>
                  <div className="scanner-key-actions">
                    <Button type="button" size="sm" variant="secondary" onClick={saveCloudApiKey}>
                      Save key
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={clearCloudApiKey}>
                      Use local only
                    </Button>
                  </div>
                </div>
              </div>
            </details>

            {auditError && (
              <Alert status="error">{auditError}</Alert>
            )}

            <Button type="submit" loading={auditLoading} size="lg" style={{ width: "100%" }}>
              {auditLoading ? "Scanning…" : "Run Audit"}
            </Button>
          </form>
        </section>

        {/* ── Results panel ──────────────────────────── */}
        <section className="results-panel" aria-live="polite">
          {auditReport ? (
            <>
              {/* Score header */}
              <div className="results-header">
                <ScoreRing score={auditReport.score} status={auditReport.status} />
                <div className="results-meta">
                  <div className="results-meta-row">
                    <h2 className="results-title">Audit result</h2>
                    <Badge
                      tone={
                        auditReport.status === "pass" ? "success"
                          : auditReport.status === "warn" ? "info"
                          : "danger"
                      }
                    >
                      {auditReport.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="results-summary">{auditReport.summary}</p>
                  <dl className="results-attrs">
                    <dt>URL</dt>
                    <dd className="results-url">{auditReport.url}</dd>
                    <dt>Source</dt>
                    <dd>{auditReport.source}</dd>
                    <dt>Scanned</dt>
                    <dd>{new Date(auditReport.scannedAt).toLocaleString()}</dd>
                    {auditReport.pageTitle && (
                      <>
                        <dt>Page title</dt>
                        <dd>{auditReport.pageTitle}</dd>
                      </>
                    )}
                  </dl>
                </div>
              </div>

              {/* Result tabs */}
              <div className="results-tabs" role="tablist">
                {(["issues", "heatmap", "prompt"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={resultTab === tab}
                    className={`results-tab ${resultTab === tab ? "is-active" : ""}`}
                    onClick={() => setResultTab(tab)}
                  >
                    {tab === "issues" ? `Issues (${auditReport.issues.length})` : tab === "heatmap" ? "Heatmap" : "AI Prompt"}
                  </button>
                ))}
              </div>

              {/* Tab panels */}
              {resultTab === "issues" && (
                <div className="result-tab-panel" role="tabpanel">
                  {auditReport.issues.length > 0 ? (
                    <div className="audit-issue-list">
                      {auditReport.issues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                      ))}
                    </div>
                  ) : (
                    <Alert status="success">No issues flagged in this scan.</Alert>
                  )}

                  {auditReport.recommendations.length > 0 && (
                    <div className="results-recommendations">
                      <h3 className="results-recs-title">Top recommendations</h3>
                      <ol className="audit-recommendations">
                        {auditReport.recommendations.map((item, index) => (
                          <li key={`${index}-${item.slice(0, 20)}`}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {resultTab === "heatmap" && (
                <div className="result-tab-panel" role="tabpanel">
                  <div className="audit-heatmap-list">
                    {auditReport.heatmap.map((zone) => (
                      <div key={zone.id} className="audit-heatmap-row">
                        <div className="audit-heatmap-meta">
                          <strong>{zone.label}</strong>
                          <span>{zone.rationale}</span>
                        </div>
                        <div className="audit-heatmap-bar-wrap">
                          <div className="audit-heatmap-track" aria-hidden="true">
                            <span
                              className="audit-heatmap-fill"
                              style={{ width: `${zone.attention}%` }}
                            />
                          </div>
                          <span className="audit-heatmap-score">{zone.attention}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resultTab === "prompt" && (
                <div className="result-tab-panel" role="tabpanel">
                  <div className="prompt-panel">
                    <div className="prompt-header">
                      <p className="prompt-desc">
                        Copy this prompt into your AI IDE (Claude Code, Cursor, Copilot) to apply all audit fixes automatically.
                      </p>
                      <Button type="button" size="sm" variant="secondary" onClick={copyPrompt}>
                        <span className="ms" aria-hidden="true">content_copy</span>
                        Copy prompt
                      </Button>
                    </div>
                    <pre className="prompt-code">{auditFixPrompt}</pre>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="results-empty">
              <span className="ms results-empty-icon">search</span>
              <p className="results-empty-title">No results yet</p>
              <p className="results-empty-sub">Enter a URL and run an audit to see UX findings here.</p>
            </div>
          )}
        </section>
      </main>

      <Toast message={toastMessage} />
    </>
  );
}
