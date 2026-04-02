import { Button } from "@zephrui/ui-react";
import type { TopTab, WorkspaceView } from "../types";
import { SnippetItem } from "../components/SnippetItem";

interface IntroductionPageProps {
  onNavigate: (tab: TopTab, view: WorkspaceView, setupTab?: "npm" | "pnpm" | "cli" | "ai") => void;
  copyAndFlash: (label: string, text: string) => void;
}

export function IntroductionPage({ onNavigate, copyAndFlash }: IntroductionPageProps) {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section id="setup-introduction" className="doc-section hero">
        {/* Left column */}
        <p className="breadcrumbs">Setup / Introduction</p>
        <h1>
          A design system{" "}
          <span className="hero-accent-word">built for AI.</span>
        </h1>
        <p className="lead">
          Every token, component, and AI hint in Zephr is engineered so
          Claude, Cursor, Codex, and Lovable produce quality UI on the
          first pass — no cleanup, no drift.
        </p>
        <div className="hero-cta-row">
          <Button
            style={{ background: "#262626", borderColor: "#262626", color: "#ffffff" }}
            onClick={() => onNavigate("components", "component-gallery")}
          >
            Browse Components
          </Button>
          <Button
            variant="secondary"
            onClick={() => onNavigate("setup", "getting-started", "ai")}
          >
            AI Quick Start
          </Button>
        </div>

        {/* Right column — terminal visual */}
        <div className="hero-terminal-col" aria-hidden="true">
          <div className="hero-terminal">
            <div className="hero-terminal-chrome">
              <span className="hero-terminal-dot red" />
              <span className="hero-terminal-dot yellow" />
              <span className="hero-terminal-dot green" />
              <span className="hero-terminal-title">zsh — 80×24</span>
            </div>
            <div className="hero-terminal-body">
              {/* Command */}
              <div className="hero-terminal-line">
                <span className="hero-terminal-prompt">❯</span>
                <span className="hero-terminal-cmd">pnpm add @zephrui/ui-react</span>
              </div>
              <div className="hero-terminal-spacer" />
              {/* Progress */}
              <div className="hero-terminal-line">
                <span className="hero-terminal-muted">Packages: </span>
                <span className="hero-terminal-warn">+53</span>
                <span className="hero-terminal-text"> </span>
                <span className="hero-terminal-progress-bar">████████████████████</span>
                <span className="hero-terminal-check"> Done</span>
              </div>
              <div className="hero-terminal-spacer" />
              {/* Packages */}
              <div className="hero-terminal-line hero-terminal-line--indent">
                <span className="hero-terminal-check">+</span>
                <span className="hero-terminal-pkg">@zephrui/core</span>
                <span className="hero-terminal-ver">0.1.2</span>
              </div>
              <div className="hero-terminal-line hero-terminal-line--indent">
                <span className="hero-terminal-check">+</span>
                <span className="hero-terminal-pkg">@zephrui/ui-react</span>
                <span className="hero-terminal-ver">0.1.2</span>
              </div>
              <div className="hero-terminal-spacer" />
              <div className="hero-terminal-line hero-terminal-line--indent">
                <span className="hero-terminal-check">Done</span>
                <span className="hero-terminal-dim-gray"> in 2.4s</span>
              </div>
              {/* Zephr welcome banner — pixel art style */}
              <div className="hero-terminal-spacer" />
              <div className="hero-terminal-banner-v2" aria-label="Zephr welcome banner">
                {/* Welcome pill */}
                <div className="hero-terminal-welcome-pill">
                  <span className="hero-terminal-welcome-star">✦</span>
                  <span>Welcome to Zephr</span>
                </div>
                {/* Pixel-art ZEPHR */}
                <div className="hero-terminal-pixel-wrap">
                  <pre className="hero-terminal-pixel-art" aria-label="ZEPHR">{
`████████  ████████  ████████  ██    ██  ████████
      ██  ██        ██    ██  ██    ██  ██    ██
    ██    ██████    ████████  ████████  ██████
  ██      ██        ██        ██    ██  ██  ██
████████  ████████  ██        ██    ██  ██    ██`
                  }</pre>
                  <span className="hero-terminal-pixel-note">← indigo, bold</span>
                </div>
                {/* Tagline */}
                <div className="hero-terminal-tagline-v2">
                  Token-native React UI&nbsp;·&nbsp;AI-assisted product development.
                </div>
              </div>
              <div className="hero-terminal-spacer" />
              <div className="hero-terminal-line">
                <span className="hero-terminal-prompt">❯</span>
                <span className="hero-terminal-cursor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKS WITH ROW ────────────────────────────────────────── */}
      <div className="hero-tools-row hero-tools-row--standalone">
        <span className="hero-tools-label">Works with</span>
        <div className="hero-tools-pills">

          {/* Claude */}
          <div className="hero-tool-pill hero-tool-pill--claude">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.827 3.678c-.406-1.026-1.248-1.678-2.162-1.678-.915 0-1.757.652-2.163 1.678L3.84 17.54H6.97l1.243-3.229h5.574l1.243 3.229h3.13L13.827 3.678zm-4.71 8.476 1.894-4.924 1.893 4.924H9.117z"/>
              </svg>
            </span>
            <span>Claude</span>
          </div>

          {/* Cursor */}
          <div className="hero-tool-pill hero-tool-pill--cursor">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 9l10 13L22 9 12 2z" fillOpacity="0.9"/>
                <path d="M12 2L22 9l-10 4L2 9l10-7z" fillOpacity="0.5"/>
              </svg>
            </span>
            <span>Cursor</span>
          </div>

          {/* GitHub Copilot */}
          <div className="hero-tool-pill hero-tool-pill--copilot">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span>Copilot</span>
          </div>

          {/* Codex / OpenAI */}
          <div className="hero-tool-pill hero-tool-pill--codex">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.511 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zm-9.022 12.609a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zm-9.66-4.126a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.805-3.387 2.018-1.165a.077.077 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.104v-5.678a.79.79 0 00-.438-.665zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08-4.778 2.758a.795.795 0 00-.393.681l-.004 6.737zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-3z"/>
              </svg>
            </span>
            <span>Codex</span>
          </div>

          {/* Lovable */}
          <div className="hero-tool-pill hero-tool-pill--lovable">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="lovable-g" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff3d3d"/>
                    <stop offset="50%" stopColor="#ff6b35"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                  </linearGradient>
                </defs>
                <path fill="url(#lovable-g)" d="M12 21.593c-.425-.439-8.993-9.371-8.993-13.36C3.007 4.548 5.37 2 8.25 2c1.862 0 3.507.956 4.5 2.338A5.493 5.493 0 0117.25 2c2.88 0 5.243 2.548 5.243 6.233 0 3.989-8.568 12.921-8.993 13.36z"/>
              </svg>
            </span>
            <span>Lovable</span>
          </div>

          {/* Bolt.new */}
          <div className="hero-tool-pill hero-tool-pill--bolt">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <text x="5" y="19" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="900" fontStyle="italic">b</text>
              </svg>
            </span>
            <span>Bolt</span>
          </div>

          {/* v0 by Vercel */}
          <div className="hero-tool-pill hero-tool-pill--v0">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <text x="2" y="18" fontFamily="Arial Black, sans-serif" fontSize="13" fontWeight="900" letterSpacing="-1">v0</text>
              </svg>
            </span>
            <span>v0</span>
          </div>

          {/* Windsurf */}
          <div className="hero-tool-pill hero-tool-pill--windsurf">
            <span className="hero-tool-pill-logo" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17c2-4 5-7 9-7s7 3 9 7"/>
                <path d="M3 11c2-3 5-5 7-5 3 0 5 2 5 5s-2 5-5 5c-2 0-4-1-5-3"/>
              </svg>
            </span>
            <span>Windsurf</span>
          </div>

        </div>
      </div>

      {/* ── 2-FEATURE CARDS ────────────────────────────────────────── */}
      <section className="doc-section">
        <div className="intro-feature-cards">

          {/* Card 1 — AI-native tokens */}
          <div className="intro-feature-card">
            <div className="intro-feature-card-inner">
              <div className="intro-feature-card-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14l4 4 10-10" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="14" cy="14" r="9" stroke="#171717" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="intro-feature-card-text">
                <p className="intro-feature-card-title">AI-native design tokens</p>
                <p className="intro-feature-card-body">
                  Every{" "}
                  <code className="intro-feature-code">--z-*</code>
                  {" "}CSS variable is named for design intent, not implementation detail —{" "}
                  <code className="intro-feature-code">--z-color-text</code>
                  {" "}not{" "}
                  <code className="intro-feature-code">--gray-900</code>.
                  {" "}AIs reason about them correctly the first time, without correction.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 — 21 slash commands */}
          <div className="intro-feature-card">
            <div className="intro-feature-card-inner">
              <div className="intro-feature-card-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 8h20M4 14h14M4 20h17" stroke="#171717" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="intro-feature-card-text">
                <p className="intro-feature-card-title">21 slash commands</p>
                <p className="intro-feature-card-body">
                  A full designer vocabulary built into your AI editor.{" "}
                  <code className="intro-feature-code">/polish</code>
                  {" "}tightens spacing and fixes token violations.{" "}
                  <code className="intro-feature-code">/audit</code>
                  {" "}flags every hardcoded hex and missing state.{" "}
                  <code className="intro-feature-code">/scaffold</code>
                  {" "}drops a complete page system in seconds.
                </p>
                <button
                  type="button"
                  className="intro-feature-card-link"
                  onClick={() => onNavigate("setup", "getting-started", "ai")}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MCP SERVER SETUP ──────────────────────────────────────── */}
      <section id="mcp-section" className="doc-section">
        <div className="section-heading">
          <p className="section-eyebrow">MCP Integration</p>
          <h2>Give your AI direct access to the full registry.</h2>
          <p>
            The Zephr MCP server connects Claude, Cursor, and Codex to live component
            specs, prop schemas, and a visual renderer — so the AI reads the design
            system before it writes a single line.
          </p>
        </div>

        {/* Tool cards */}
        <div className="mcp-section-grid">
          <div className="mcp-tool-card mcp-tool-card--figma">
            <code className="mcp-tool-chip">search_components</code>
            <p className="mcp-tool-desc mcp-tool-desc--figma">Find components by keyword. Returns name, category, and AI hints for every match.</p>
          </div>
          <div className="mcp-tool-card mcp-tool-card--figma">
            <code className="mcp-tool-chip">get_component_spec</code>
            <p className="mcp-tool-desc mcp-tool-desc--figma">Full prop schema for any component — types, defaults, accepted values, accessibility notes.</p>
          </div>
          <div className="mcp-tool-card mcp-tool-card--figma">
            <code className="mcp-tool-chip">generate_component</code>
            <p className="mcp-tool-desc mcp-tool-desc--figma">Generate a ready-to-paste component snippet + AI prompt tailored to your editor and style pack.</p>
          </div>
          <div className="mcp-tool-card mcp-tool-card--figma">
            <code className="mcp-tool-chip">scaffold_page</code>
            <p className="mcp-tool-desc mcp-tool-desc--figma">Compose a full page from a list of component IDs — returns source, config, and install command.</p>
          </div>
          <div className="mcp-tool-card mcp-tool-card--figma">
            <code className="mcp-tool-chip">install_plan</code>
            <p className="mcp-tool-desc mcp-tool-desc--figma">Step-by-step install guide tailored to your framework (Vite, Next.js, Remix) and package manager.</p>
          </div>
          <div className="mcp-tool-card mcp-tool-card--figma">
            <code className="mcp-tool-chip">zephr_render</code>
            <p className="mcp-tool-desc mcp-tool-desc--figma">Pass JSX, get a pixel-accurate screenshot back in light and dark mode — before any code lands in your repo.</p>
          </div>
        </div>

        {/* Config snippets */}
        <div className="mcp-config-grid">
          <div>
            <p className="mcp-config-label">Claude Code · Claude Desktop</p>
            <SnippetItem
              label=".claude/settings.json"
              code={`{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["-y", "@zephrui/mcp-server"]\n    }\n  }\n}`}
              onCopy={() => copyAndFlash("MCP config", `{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["-y", "@zephrui/mcp-server"]\n    }\n  }\n}`)}
            />
          </div>
          <div>
            <p className="mcp-config-label">Cursor · Windsurf</p>
            <SnippetItem
              label=".cursor/mcp.json"
              code={`{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["-y", "@zephrui/mcp-server"]\n    }\n  }\n}`}
              onCopy={() => copyAndFlash("MCP config", `{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["-y", "@zephrui/mcp-server"]\n    }\n  }\n}`)}
            />
          </div>
        </div>
      </section>

      {/* ── QUICK INSTALL ─────────────────────────────────────────── */}
      <section id="install" className="doc-section">
        <div className="section-heading">
          <p className="section-eyebrow">Quickstart</p>
          <h2>Zero to AI-ready in three commands.</h2>
          <p>Install the package, initialise Zephr, and import tokens in your root layout.</p>
        </div>
        <div className="snippet-stack">
          <SnippetItem
            label="1 — Install the package"
            code="npm install @zephrui/ui-react"
            onCopy={() => copyAndFlash("Install", "npm install @zephrui/ui-react")}
          />
          <SnippetItem
            label="2 — Initialise Zephr (writes AI context + CSS tokens)"
            code="npx zephr init"
            onCopy={() => copyAndFlash("Init", "npx zephr init")}
          />
          <SnippetItem
            label="3 — Import tokens in your root layout"
            code={`import './src/styles/zephr.css';\nimport { Button } from '@zephrui/ui-react';\n\nexport default function App() {\n  return <Button variant="primary">Get started</Button>;\n}`}
            onCopy={() => copyAndFlash("Import snippet", `import './src/styles/zephr.css';\nimport { Button } from '@zephrui/ui-react';`)}
          />
        </div>
      </section>

      {/* ── EXPLORE ───────────────────────────────────────────────── */}
      <section id="explore" className="doc-section">
        <div className="section-heading">
          <p className="section-eyebrow">Explore</p>
          <h2>Everything you need to build a complete SaaS product.</h2>
        </div>
        <div className="intro-links intro-links-4">
          <button
            type="button"
            className="intro-link-card"
            onClick={() => onNavigate("components", "component-gallery")}
          >
            <div className="intro-link-card-inner">
              <span className="intro-link-icon ms">widgets</span>
              <span className="intro-link-label">Components</span>
              <span className="intro-link-desc">
                49 components across atoms, molecules, and organisms
              </span>
            </div>
            <span className="intro-link-card-arrow ms">arrow_forward</span>
          </button>
          <button
            type="button"
            className="intro-link-card"
            onClick={() => onNavigate("components", "templates")}
          >
            <div className="intro-link-card-inner">
              <span className="intro-link-icon ms">description</span>
              <span className="intro-link-label">Pages</span>
              <span className="intro-link-desc">
                Full-page SaaS templates — CRM, ops, analytics, support
              </span>
            </div>
            <span className="intro-link-card-arrow ms">arrow_forward</span>
          </button>
          <button
            type="button"
            className="intro-link-card"
            onClick={() => onNavigate("components", "widgets")}
          >
            <div className="intro-link-card-inner">
              <span className="intro-link-icon ms">bolt</span>
              <span className="intro-link-label">Widgets</span>
              <span className="intro-link-desc">
                60+ SaaS-focused widgets — drop in fully wired
              </span>
            </div>
            <span className="intro-link-card-arrow ms">arrow_forward</span>
          </button>
          <button
            type="button"
            className="intro-link-card"
            onClick={() => onNavigate("setup", "getting-started", "ai")}
          >
            <div className="intro-link-card-inner">
              <span className="intro-link-icon ms">smart_toy</span>
              <span className="intro-link-label">AI Setup</span>
              <span className="intro-link-desc">
                Claude, Cursor, Codex, Lovable — the exact prompt to use
              </span>
            </div>
            <span className="intro-link-card-arrow ms">arrow_forward</span>
          </button>
        </div>
      </section>
    </>
  );
}
