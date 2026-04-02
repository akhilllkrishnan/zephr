import { SnippetItem } from "../components/SnippetItem";

interface ChangelogPageProps {
  onCopy?: (label: string, text: string) => void;
}

export function ChangelogPage({ onCopy }: ChangelogPageProps) {
  const copyAndFlash = onCopy ?? ((_, text) => navigator.clipboard.writeText(text).catch(() => {}));
  return (
    <>
  <section id="changelog-overview" className="doc-section hero">
    <p className="breadcrumbs">Product / Changelog</p>
    <h1>Release notes</h1>
    <p className="lead">
      Every meaningful change to Zephr — component APIs, AI tooling, CLI, MCP server, and docs — tracked in one place.
    </p>
    <div className="cl-hero-stats">
      <div className="cl-hero-stat">
        <strong>5</strong>
        <span>releases</span>
      </div>
      <div className="cl-hero-stat">
        <strong>v0.5.0</strong>
        <span>latest · March 16, 2026</span>
      </div>
      <div className="cl-hero-stat">
        <strong>v1.0.0</strong>
        <span>production GA · planned</span>
      </div>
    </div>
  </section>

  <section className="doc-section">
    <div className="cl-timeline">

      {/* v0.5.0 */}
      <div id="release-0-5-0" className="cl-entry cl-entry--latest">
        <div className="cl-entry-head">
          <span className="cl-version">v0.5.0</span>
          <span className="cl-date">March 16, 2026</span>
          <span className="cl-badge">Latest</span>
        </div>
        <p className="cl-summary">
          MCP action tools, <code>zephr_render</code>, welcome banners, docs polish, open-source release.
        </p>
        <div className="cl-changes">
          <div>
            <p className="cl-category-label">✦ New features</p>
            <ul className="cl-list">
              <li><strong>MCP action tools</strong> — <code>generate_component</code>, <code>scaffold_page</code>, <code>apply_theme</code>, <code>install_plan</code> added to <code>@zephrui/mcp-server</code>. AI editors can now write code, not just look things up.</li>
              <li><strong><code>zephr_render</code> MCP tool</strong> — renders JSX in a headless Playwright browser and returns a screenshot + token compliance report. Visual verification before writing to disk.</li>
              <li>Branded ZEPHR pixel-block welcome banner on <code>npm install @zephrui/ui-react</code> — indigo block art, version number, next-step hints. Silent in CI/non-TTY.</li>
              <li>Same banner on <code>zephr init</code> and <code>zephr add-skills</code> — fires when connecting to Claude Code, Cursor, or Codex.</li>
              <li>Redesigned Introduction feature grid: 3 columns, expanded copy for AI-native tokens, 21 slash commands, and Zephr Render.</li>
              <li>GitHub icon link added to the header — signals open-source status at a glance.</li>
              <li>Introduction page set as the default homepage — no <code>?view=</code> param required.</li>
            </ul>
          </div>
          <div>
            <p className="cl-category-label"><span className="ms cl-category-icon">bolt</span> Improvements</p>
            <ul className="cl-list">
              <li>Slash commands chip row in the feature card shows <code>/polish</code>, <code>/audit</code>, <code>/scaffold</code>, <code>/bolder</code>, <code>/harden</code>, <code>/tighten</code>, and a "+15 more" overflow pill.</li>
              <li>58 component pages polished — better prop tables, sticky thead, code block AI prompts, consistent section headings.</li>
              <li>Templates gallery shows all 25 entries (5 templates + 20 examples) instead of 5.</li>
              <li><code>@zephrui/ui-react</code> bumped to 0.1.2, <code>@zephrui/cli</code> republished — both live on npm.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* v0.4.0 */}
      <div id="release-0-4-0" className="cl-entry">
        <div className="cl-entry-head">
          <span className="cl-version">v0.4.0</span>
          <span className="cl-date">March 4, 2026</span>
        </div>
        <p className="cl-summary">Premium visual refinement, PRO gating, premium page templates, and docs narrative pages.</p>
        <div className="cl-changes">
          <div>
            <p className="cl-category-label">✦ New features</p>
            <ul className="cl-list">
              <li>Premium docs shell with accent-driven previews and a single default Zephr theme.</li>
              <li>PRO component and page gating — free-tier users see locked overlay and upgrade modal.</li>
              <li>5 premium page templates: Dashboard, Auth, Settings, Onboarding, Marketing.</li>
              <li>Foundations page with "How tokens work" visual flow and naming convention reference.</li>
              <li>Team page with Avatar components and process grid.</li>
            </ul>
          </div>
          <div>
            <p className="cl-category-label"><span className="ms cl-category-icon">bolt</span> Improvements</p>
            <ul className="cl-list">
              <li>Template previews wrapped in <code>BrowserPreviewFrame</code> with address bar chrome.</li>
              <li>Dashboard template: sparkline SVGs, stat variance indicators, activity timeline.</li>
              <li>Auth template: social auth buttons, testimonial quote, split-panel layout.</li>
              <li>Marketing template: gradient hero, 3-tier pricing cards, testimonial carousel.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* v0.3.0 */}
      <div id="release-0-3-0" className="cl-entry">
        <div className="cl-entry-head">
          <span className="cl-version">v0.3.0</span>
          <span className="cl-date">March 3, 2026</span>
        </div>
        <p className="cl-summary">P0 sprint: dark mode, layout primitives, tier system, utility compiler removal.</p>
        <div className="cl-changes">
          <div>
            <p className="cl-category-label">✦ New features</p>
            <ul className="cl-list">
              <li>Dark mode with <code>[data-theme="dark"]</code> + <code>prefers-color-scheme</code> support.</li>
              <li>Layout primitives: Stack, Grid, Box, Spacer — free tier.</li>
              <li>License key tier system: <code>zephr upgrade --key</code> + <code>zephr whoami</code>.</li>
              <li>Docs playground: dark mode toggle, tier simulator, PRO badges on components.</li>
            </ul>
          </div>
          <div>
            <p className="cl-category-label">💥 Breaking changes</p>
            <ul className="cl-list">
              <li>Removed utility class compiler — all <code>z-*</code> classes eliminated.</li>
              <li>Components now self-style via CSS variables only (no external utility output).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* v0.2.0 */}
      <div id="release-0-2-0" className="cl-entry">
        <div className="cl-entry-head">
          <span className="cl-version">v0.2.0</span>
          <span className="cl-date">March 2, 2026</span>
        </div>
        <p className="cl-summary">Docs parity upgrade: API reference mode, narrative pages, and command-style search.</p>
        <div className="cl-changes">
          <div>
            <p className="cl-category-label">✦ New features</p>
            <ul className="cl-list">
              <li>Metadata-driven API Reference mode for every component.</li>
              <li>Setup narrative pages: Mission &amp; Vision, Team operating model.</li>
              <li>Keyboard-driven search with up/down/enter and Cmd/Ctrl+K focus.</li>
            </ul>
          </div>
          <div>
            <p className="cl-category-label"><span className="ms cl-category-icon">bolt</span> Improvements</p>
            <ul className="cl-list">
              <li>Expanded page templates navigation with deep links and section TOC.</li>
              <li>Component search filters flat when active, restores grouped tree when cleared.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* v0.1.0 */}
      <div id="release-0-1-0" className="cl-entry">
        <div className="cl-entry-head">
          <span className="cl-version">v0.1.0</span>
          <span className="cl-date">March 1, 2026</span>
        </div>
        <p className="cl-summary">Initial release: component previews, accent system, and AI block prompts.</p>
        <div className="cl-changes">
          <div>
            <p className="cl-category-label">✦ New features</p>
            <ul className="cl-list">
              <li>30 components across atoms, molecules, and organisms.</li>
              <li>Accent switcher with persistent state via sessionStorage.</li>
              <li>AI block prompts with one-click copy for Claude, Cursor, and Codex.</li>
              <li>Install snippets (npm / pnpm / CLI) per component.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </section>

  <section id="migrations-overview" className="doc-section">
    <div className="section-heading">
      <h2>Migrations</h2>
      <p>Upgrade notes for documentation IA and deep links between versions.</p>
    </div>
    <ul className="release-list">
      <li>Setup now includes dedicated Mission &amp; Vision and Team pages.</li>
      <li>Components now supports both Guides mode and API Reference mode.</li>
      <li>Page templates now expose stable section anchors for direct linking.</li>
    </ul>
  </section>

  <section id="migration-0-1-to-0-2" className="doc-section">
    <div className="section-heading">
      <h2>Migration: v0.1.0 → v0.2.0</h2>
      <p>Action list for existing links, docs wrappers, and agent scripts.</p>
    </div>
    <div className="snippet-stack changelog-snippet-stack">
      <SnippetItem
        label="What changed"
        code={`1. Top-level navigation remains: Setup, Components, Pages, Change Log
2. Components now has two modes:
   - view=components
   - view=api-reference
3. New setup routes:
   - view=mission
   - view=team
4. New template anchors:
   #template-dashboard, #template-auth, #template-settings, #template-onboarding, #template-marketing`}
        onCopy={() => copyAndFlash("Migration notes", `1. Top-level navigation remains: Setup, Components, Pages, Change Log
2. Components now has two modes:
   - view=components
   - view=api-reference
3. New setup routes:
   - view=mission
   - view=team
4. New template anchors:
   #template-dashboard, #template-auth, #template-settings, #template-onboarding, #template-marketing`)}
      />
    </div>
  </section>

  <section id="release-upcoming" className="doc-section">
    <div className="section-heading">
      <h2>Roadmap</h2>
      <p>Upcoming milestones for the Zephr ecosystem.</p>
    </div>

    <div className="roadmap-track">
      <div className="roadmap-milestone active">
        <div className="roadmap-marker"></div>
        <div className="roadmap-content">
          <div className="roadmap-label">
            <span className="roadmap-status in-progress">In progress</span>
            <span className="roadmap-version">v0.6.0</span>
          </div>
          <h4>Cloud features &amp; Figma sync</h4>
          <ul className="release-list">
            <li>Cloud API key flows for logo / avatar / icon providers.</li>
            <li>Figma token import via Variables API.</li>
            <li>Design-to-code sync: push Figma changes into core design tokens.</li>
            <li>Team workspace with shared accent presets and visual defaults.</li>
          </ul>
        </div>
      </div>

      <div className="roadmap-milestone">
        <div className="roadmap-marker"></div>
        <div className="roadmap-content">
          <div className="roadmap-label">
            <span className="roadmap-status planned">Planned</span>
            <span className="roadmap-version">v0.7.0</span>
          </div>
          <h4>Animation primitives &amp; test coverage</h4>
          <ul className="release-list">
            <li>Enter / exit / layout transition tokens baked into all interactive components.</li>
            <li>Staggered list animations and skeleton loading states.</li>
            <li>Visual regression test suite with Playwright snapshots.</li>
            <li>Accessibility audit pass — WCAG 2.2 AA target across all components.</li>
          </ul>
        </div>
      </div>

      <div className="roadmap-milestone">
        <div className="roadmap-marker"></div>
        <div className="roadmap-content">
          <div className="roadmap-label">
            <span className="roadmap-status planned">Planned</span>
            <span className="roadmap-version">v1.0.0</span>
          </div>
          <h4>Production GA</h4>
          <ul className="release-list">
            <li>Stable API with semver guarantees.</li>
            <li>Publishable docs presets for external projects.</li>
            <li>Animation primitives (enter/exit/layout transitions).</li>
            <li>Comprehensive test suite with visual regression coverage.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
    </>

  );
}
