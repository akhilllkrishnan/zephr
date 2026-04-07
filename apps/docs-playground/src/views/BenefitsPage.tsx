import React from "react";
import { DocPageNav } from "../components/DocPageNav";

interface BenefitsPageProps {
  onNavigate?: (tab: string, view: string) => void;
}

const benefits = [
  {
    icon: "bolt",
    title: "Ship UI in the first pass",
    description:
      "Every component carries AI usage hints, prop schemas, and example snippets — so Claude, Cursor, and Codex generate correct code without back-and-forth correction.",
    metric: "~0 cleanup rounds",
  },
  {
    icon: "token",
    title: "Tokens, not hardcodes",
    description:
      "Every visual value — colour, spacing, radius, shadow — is a semantic token. AI tools read the token name and reason about design intent, not hex codes that drift.",
    metric: "100% token-native",
  },
  {
    icon: "sync",
    title: "Dark mode for free",
    description:
      "Swap style packs or toggle themes — all components adapt automatically. No conditional colour logic, no manual overrides, no QA pass needed.",
    metric: "Zero conditional styles",
  },
  {
    icon: "visibility",
    title: "Render before you commit",
    description:
      "The zephr_render MCP tool passes JSX to a headless Playwright browser and returns a pixel-accurate screenshot — before a single line lands in your repo.",
    metric: "Visual verify < 2 s",
  },
  {
    icon: "terminal",
    title: "21 design operations built in",
    description:
      "From /scaffold to /critique to /polish — a full designer vocabulary runs in any AI editor. Fix spacing, add missing states, or generate entire page systems in one command.",
    metric: "21 slash commands",
  },
  {
    icon: "construction",
    title: "Framework agnostic install",
    description:
      "One package. Works with Vite, Next.js, Remix, and Astro. Configure once via zephr.config.ts — accent colour, style pack, and token overrides all in one place.",
    metric: "4 frameworks supported",
  },
];

const comparisons = [
  {
    aspect: "AI code quality",
    before: "Generic-looking components with hardcoded colours and inconsistent spacing",
    after: "Token-native, on-brand output on the first generation",
  },
  {
    aspect: "Dark mode",
    before: "Manually maintained with conditional class names and duplicated colour values",
    after: "Automatic — swap the theme, everything adapts",
  },
  {
    aspect: "Design system drift",
    before: "Components diverge from tokens over time as engineers take shortcuts",
    after: "/token-check and /audit catch every violation before merge",
  },
  {
    aspect: "Onboarding a new AI tool",
    before: "Spend hours writing prompts to teach the AI your conventions",
    after: "/teach-zephr gathers your project context in one session",
  },
];

export function BenefitsPage({ onNavigate }: BenefitsPageProps) {
  return (
    <>
      {/* ── Hero ── */}
      <section id="benefits-overview" className="doc-section hero">
        <p className="breadcrumbs">Setup / Benefits</p>
        <h1>Why Zephr?</h1>
        <p className="lead">
          Every other design system was built for humans. Zephr is built for the
          moment your AI writes the first line — so the output is production-quality
          from the start.
        </p>
      </section>

      {/* ── Benefit cards ── */}
      <section id="benefits-cards" className="doc-section">
        <div className="benefits-grid">
          {benefits.map((b) => (
            <article key={b.icon} className="benefit-card">
              <div className="benefit-card-header">
                <span className="ms benefit-icon">{b.icon}</span>
                <span className="benefit-metric">{b.metric}</span>
              </div>
              <h3 className="benefit-title">{b.title}</h3>
              <p className="benefit-desc">{b.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Before / After ── */}
      <section id="benefits-comparison" className="doc-section">
        <div className="section-heading">
          <h2>Before and after</h2>
          <p>What changes when you add Zephr to an AI-assisted workflow.</p>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Without Zephr</th>
                <th>With Zephr</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c) => (
                <tr key={c.aspect}>
                  <td>
                    <span className="comparison-aspect">{c.aspect}</span>
                    <span className="comparison-before">{c.before}</span>
                  </td>
                  <td>
                    <span className="comparison-after">{c.after}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="benefits-cta" className="doc-section benefits-cta-section">
        <h2>Ready to start?</h2>
        <p>Pick your style pack, set your accent colour, and run three commands.</p>
        <div className="hero-actions">
          <button
            type="button"
            className="z-button"
            data-z-button="true"
            data-variant="primary"
            onClick={() => onNavigate?.("setup", "getting-started")}
          >
            Get started
          </button>
          <button
            type="button"
            className="z-button"
            data-z-button="true"
            data-variant="secondary"
            onClick={() => onNavigate?.("components", "component-gallery")}
          >
            Browse components
          </button>
        </div>
        <DocPageNav
          prev={{ label: "Foundations", onClick: () => onNavigate?.("setup", "foundations") }}
          next={{ label: "Browse Components", onClick: () => onNavigate?.("components", "component-gallery") }}
        />
      </section>
    </>
  );
}
