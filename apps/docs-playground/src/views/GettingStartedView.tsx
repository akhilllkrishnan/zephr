import { type RefObject } from "react";
import { Badge, Button } from "@zephrui/ui-react";
import { stylePacks, type StylePackName } from "@zephrui/core/browser";
import type { WorkspaceView } from "../types";
import { SnippetItem } from "../components/SnippetItem";
import { DocPageNav } from "../components/DocPageNav";

type AiToolKey = "codex" | "claude" | "cursor";
type AiProjectPreset = "vite-react" | "nextjs";
type AiPackageManager = "npm" | "pnpm" | "yarn" | "bun";

const accentPresets = [
  "#121212",
  "#47c2ff",
  "#7d52f4",
  "#f6b51e",
  "#fa7319",
  "#1fc16b",
  "#111827"
];

const aiToolLabels: Record<AiToolKey, string> = {
  codex: "Codex",
  claude: "Claude Code",
  cursor: "Cursor"
};

const aiProjectLabels: Record<AiProjectPreset, string> = {
  "vite-react": "Vite + React",
  nextjs: "Next.js"
};

function defaultAccentForPack(pack: StylePackName): string {
  return stylePacks[pack]?.color.primary ?? "#121212";
}

export interface GettingStartedViewProps {
  stylePack: StylePackName;
  setStylePack: (pack: StylePackName) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  accentDraft: string;
  setAccentDraft: (draft: string) => void;
  applyAccentDraft: () => void;
  setAccentIfValid: (value: string) => void;
  setupTab: "npm" | "pnpm" | "cli" | "ai";
  setSetupTab: (tab: "npm" | "pnpm" | "cli" | "ai") => void;
  setupTabsRef: RefObject<HTMLDivElement | null>;
  setupIndicator: { left: number; width: number; opacity: number };
  configSnippet: string;
  aiTool: AiToolKey;
  setAiTool: (tool: AiToolKey) => void;
  aiProject: AiProjectPreset;
  setAiProject: (project: AiProjectPreset) => void;
  aiPackageManager: AiPackageManager;
  setAiPackageManager: (manager: AiPackageManager) => void;
  aiProjectInitCommand: string;
  aiInstallCommand: string;
  aiCloudInstallCommand: string;
  aiContextPath: string;
  aiContextSnippet: string;
  aiPromptSnippet: string;
  selectComponent: (id: string) => void;
  copyAndFlash: (label: string, text: string) => void;
  setView: (view: WorkspaceView) => void;
}

export function GettingStartedView({
  stylePack,
  setStylePack,
  accentColor,
  setAccentColor,
  accentDraft,
  setAccentDraft,
  applyAccentDraft,
  setAccentIfValid,
  setupTab,
  setSetupTab,
  setupTabsRef,
  setupIndicator,
  configSnippet,
  aiTool,
  setAiTool,
  aiProject,
  setAiProject,
  aiPackageManager: aiPackageManager,
  setAiPackageManager,
  aiProjectInitCommand,
  aiInstallCommand,
  aiCloudInstallCommand,
  aiContextPath,
  aiContextSnippet,
  aiPromptSnippet,
  selectComponent,
  copyAndFlash,
  setView,
}: GettingStartedViewProps) {
  return (
    <>
      {/* ── Hero ── */}
      <section id="overview" className="doc-section hero">
        <p className="breadcrumbs">Get Started</p>
        <h1>Set up in three steps</h1>
        <p className="lead">
          Pick your accent color, install the package, and start building with AI-ready components.
        </p>
        {/* 3-step progress indicator */}
        <div className="gs-steps-row" role="list">
          <div className="gs-step-item is-active" role="listitem">
            <div className="gs-step-badge" aria-label="Step 1">1</div>
            <span className="gs-step-label">Choose accent</span>
          </div>
          <div className="gs-step-line" aria-hidden="true" />
          <div className="gs-step-item" role="listitem">
            <div className="gs-step-badge" aria-label="Step 2">2</div>
            <span className="gs-step-label">Install</span>
          </div>
          <div className="gs-step-line" aria-hidden="true" />
          <div className="gs-step-item" role="listitem">
            <div className="gs-step-badge" aria-label="Step 3">3</div>
            <span className="gs-step-label">Build</span>
          </div>
        </div>
      </section>

      {/* ── Step 0 — Style pack ── */}
      <section id="style-pack" className="doc-section">
        <div className="gs-section-step" aria-hidden="true">
          <div className="gs-section-step-num">1</div>
          Choose a style pack
        </div>
        <div className="section-heading">
          <h2>Style pack</h2>
          <p>Each pack provides a distinct typographic and spatial personality. Tokens, spacing, and border radii all change — components stay the same.</p>
        </div>
        <div className="style-pack-grid" role="radiogroup" aria-label="Style pack">
          {(["notion", "stripe", "linear", "framer"] as StylePackName[]).map((pack) => (
            <button
              key={pack}
              type="button"
              role="radio"
              aria-checked={stylePack === pack}
              className={`style-pack-card${stylePack === pack ? " is-active" : ""}`}
              onClick={() => setStylePack(pack)}
            >
              <span className="style-pack-card-name">{pack.charAt(0).toUpperCase() + pack.slice(1)}</span>
              <span className="style-pack-card-desc">
                {pack === "notion" ? "Clean, neutral, document-first" :
                 pack === "stripe" ? "Precision, density, data-forward" :
                 pack === "linear" ? "Sharp, minimal, keyboard-native" :
                 "Motion-aware, expressive, bold"}
              </span>
              <div className="style-pack-card-preview" aria-hidden="true">
                <div className="spp-btn spp-btn--primary" style={{ background: defaultAccentForPack(pack) }}>Save</div>
                <div className="spp-btn spp-btn--secondary">Dismiss</div>
              </div>
              {stylePack === pack && <span className="style-pack-card-check ms">check_circle</span>}
            </button>
          ))}
        </div>
      </section>

      {/* ── Step 2 — Accent color ── */}
      <section id="accent-selection" className="doc-section">
        <div className="gs-section-step" aria-hidden="true">
          <div className="gs-section-step-num">2</div>
          Choose your accent color
        </div>
        <div className="gs-accent-layout">
          {/* Left — controls */}
          <div>
            <div className="section-heading">
              <div className="section-heading-row">
                <div>
                  <h2>Accent color</h2>
                  <p>Powers every primary action, link, focus ring, and component highlight. Changes propagate instantly across all previews.</p>
                </div>
                <Badge tone="neutral">{accentColor}</Badge>
              </div>
            </div>
            <div className="accent-swatches" role="radiogroup" aria-label="Accent presets">
              {accentPresets.map((color) => (
                <button
                  key={color}
                  type="button"
                  role="radio"
                  aria-label={`Set accent ${color}`}
                  aria-checked={accentColor === color}
                  className={`accent-dot ${accentColor === color ? "is-active" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setAccentColor(color)}
                />
              ))}
            </div>
            <div className="accent-input-row accent-inline-row">
              <input
                type="color"
                value={accentColor}
                onChange={(event) => {
                  setAccentColor(event.target.value);
                  setAccentDraft(event.target.value);
                }}
                aria-label="Accent color picker"
              />
              <input
                type="text"
                value={accentDraft}
                onChange={(event) => setAccentIfValid(event.target.value)}
                onBlur={applyAccentDraft}
                onKeyDown={(event) => { if (event.key === "Enter") applyAccentDraft(); }}
                placeholder="#121212"
                aria-label="Accent color hex"
              />
            </div>
          </div>

          {/* Right — live preview card */}
          <div className="gs-live-preview" aria-label="Live accent preview">
            <div className="gs-live-preview-bar">
              <div className="gs-live-preview-dot" />
              <div className="gs-live-preview-dot" />
              <div className="gs-live-preview-dot" />
              <span className="gs-live-preview-bar-label">Live preview</span>
            </div>
            <div className="gs-live-preview-body">
              <p className="gs-live-preview-title">Invite your team</p>
              <p className="gs-live-preview-desc">
                Add members to your workspace. They'll get access to all shared projects.
              </p>
              <div className="gs-live-preview-row">
                <button className="gs-preview-btn gs-preview-btn-ghost">Cancel</button>
                <button
                  className="gs-preview-btn gs-preview-btn-primary"
                  style={{ backgroundColor: accentColor }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  Send invites
                </button>
              </div>
            </div>
            <div className="gs-live-preview-tokens">
              <div className="gs-live-preview-token">
                <span
                  className="gs-live-preview-token-dot"
                  style={{ background: accentColor }}
                />
                <code>--z-color-primary</code>
              </div>
              <div className="gs-live-preview-token">
                <span
                  className="gs-live-preview-token-dot"
                  style={{ background: `${accentColor}28`, border: `1px solid ${accentColor}44` }}
                />
                <code>--z-color-info-lighter</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 2 — Install ── */}
      <section id="setup" className="doc-section">
        <div className="gs-section-step" aria-hidden="true">
          <div className="gs-section-step-num">2</div>
          Install in your project
        </div>
        <div className="section-heading">
          <h2>Install in your project</h2>
          <p>Pick your package manager or tool below.</p>
        </div>
        <div ref={setupTabsRef} className="setup-inner-tabs" role="tablist">
          <span
            className="setup-inner-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${setupIndicator.left}px)`,
              width: setupIndicator.width,
              opacity: setupIndicator.opacity
            }}
          />
          {(["npm", "pnpm", "cli", "ai"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={setupTab === t}
              className={`setup-inner-tab ${setupTab === t ? "is-active" : ""}`}
              onClick={() => setSetupTab(t)}
            >
              {t === "ai" ? "AI Tools" : t}
            </button>
          ))}
        </div>
        <div className="setup-tab-body">
          {setupTab === "npm" && (
            <div className="snippet-stack">
              <SnippetItem label="Install" code={`npm install @zephrui/ui-react`} onCopy={() => copyAndFlash("Install", "npm install @zephrui/ui-react")} />
              <SnippetItem label="zephr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
            </div>
          )}
          {setupTab === "pnpm" && (
            <div className="snippet-stack">
              <SnippetItem label="Install" code={`pnpm add @zephrui/ui-react`} onCopy={() => copyAndFlash("Install", "pnpm add @zephrui/ui-react")} />
              <SnippetItem label="zephr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
            </div>
          )}
          {setupTab === "cli" && (
            <div className="snippet-stack">
              <SnippetItem label="Init" code={`npx zephr init --accent ${accentColor}`} onCopy={() => copyAndFlash("CLI", `npx zephr init --accent ${accentColor}`)} />
              <SnippetItem label="Add a component" code={`npx zephr add button`} onCopy={() => copyAndFlash("Add", "npx zephr add button")} />
            </div>
          )}
          {setupTab === "ai" && (
            <div className="snippet-stack">
              <div className="ai-generator-panel">
                <label className="field">
                  <span>AI tool</span>
                  <div className="generator-chip-row">
                    {(Object.keys(aiToolLabels) as AiToolKey[]).map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        className={`generator-chip ${aiTool === tool ? "is-active" : ""}`}
                        onClick={() => setAiTool(tool)}
                      >
                        {aiToolLabels[tool]}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="field">
                  <span>Project preset</span>
                  <div className="generator-chip-row">
                    {(Object.keys(aiProjectLabels) as AiProjectPreset[]).map((project) => (
                      <button
                        key={project}
                        type="button"
                        className={`generator-chip ${aiProject === project ? "is-active" : ""}`}
                        onClick={() => setAiProject(project)}
                      >
                        {aiProjectLabels[project]}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="field">
                  <span>Package manager</span>
                  <div className="generator-chip-row">
                    {(["npm", "pnpm", "yarn", "bun"] as const).map((manager) => (
                      <button
                        key={manager}
                        type="button"
                        className={`generator-chip ${aiPackageManager === manager ? "is-active" : ""}`}
                        onClick={() => setAiPackageManager(manager)}
                      >
                        {manager}
                      </button>
                    ))}
                  </div>
                </label>
              </div>
              <SnippetItem
                label="Create project"
                code={aiProjectInitCommand}
                onCopy={() => copyAndFlash("Project init", aiProjectInitCommand)}
              />
              <SnippetItem
                label="Base install"
                code={aiInstallCommand}
                onCopy={() => copyAndFlash("Install", aiInstallCommand)}
              />
              <SnippetItem
                label="Cloud assets SDK (optional)"
                code={aiCloudInstallCommand}
                onCopy={() => copyAndFlash("Cloud SDK install", aiCloudInstallCommand)}
              />
              <SnippetItem
                label={aiContextPath}
                code={aiContextSnippet}
                onCopy={() => copyAndFlash(`${aiContextPath} snippet`, aiContextSnippet)}
              />
              <SnippetItem
                label={`${aiToolLabels[aiTool]} prompt`}
                code={aiPromptSnippet}
                onCopy={() => copyAndFlash(`${aiToolLabels[aiTool]} prompt`, aiPromptSnippet)}
              />
            </div>
          )}
        </div>
        {/* ── Step 3 — Build CTA ── */}
        <div className="gs-cta-card">
          <div className="gs-cta-text">
            <h3>
              <span style={{ color: "var(--accent)" }}>Step 3</span> — Start building
            </h3>
            <p>Browse 58 AI-ready components, copy snippets, and ship faster.</p>
          </div>
          <Button onClick={() => selectComponent("button")}>Browse components <span className="ms">arrow_forward</span></Button>
        </div>
        <DocPageNav
          prev={{ label: "Introduction", onClick: () => setView("introduction") }}
          next={{ label: "Slash Commands", onClick: () => setView("slash-commands") }}
        />
      </section>
    </>
  );
}
