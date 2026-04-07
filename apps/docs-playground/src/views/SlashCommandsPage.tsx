import { useState } from "react";
import { DocPageNav } from "../components/DocPageNav";

interface SlashCommand {
  name: string;
  description: string;
  trigger: string;
  example: string;
  category: "build" | "refine" | "quality" | "adapt" | "context";
  args?: string;
}

const COMMANDS: SlashCommand[] = [
  // ── Build ──────────────────────────────────────────────────────────────
  {
    name: "/scaffold",
    category: "build",
    description: "Drop a complete, wired page system in seconds — Dashboard, Auth, Settings, Onboarding, or Marketing.",
    trigger: "Starting a new page from scratch and want full structure immediately.",
    example: "/scaffold dashboard",
    args: "dashboard | settings | auth | onboarding | marketing",
  },
  {
    name: "/compose",
    category: "build",
    description: "Assemble a layout from Zephr components based on a plain-language description.",
    trigger: "You know what the page needs to do but don't want to specify every component.",
    example: "/compose A SaaS pricing page with a 3-tier comparison table and an FAQ section below",
  },
  {
    name: "/widget",
    category: "build",
    description: "Drop in a fully-wired Zephr widget — data tables, command palettes, notification feeds, and more.",
    trigger: "You need a complex interactive block wired with real props without writing it from scratch.",
    example: "/widget notification-feed",
    args: "data-table | command-palette | notification-feed | ...",
  },
  // ── Refine ─────────────────────────────────────────────────────────────
  {
    name: "/polish",
    category: "refine",
    description: "Final refinement pass — tighten spacing, align type scales, normalize border radii, fix token violations.",
    trigger: "The UI works but feels rough. Pre-review or pre-demo cleanup.",
    example: "/polish",
  },
  {
    name: "/tighten",
    category: "refine",
    description: "Reduce padding and spacing inconsistencies. Use when the UI feels loose or unfinished.",
    trigger: "Sections feel too spread out, padding varies between components, or the layout looks airy.",
    example: "/tighten",
  },
  {
    name: "/breathe",
    category: "refine",
    description: "Add vertical rhythm and whitespace. Use when layout feels compressed or rushed.",
    trigger: "Content is cramped, headings butt up against content, or the page feels hard to scan.",
    example: "/breathe",
  },
  {
    name: "/bolder",
    category: "refine",
    description: "Amplify timid designs — increase contrast, strengthen visual hierarchy, dominate the primary action.",
    trigger: "The primary CTA doesn't stand out, hierarchy is flat, or the UI looks washed out.",
    example: "/bolder",
  },
  {
    name: "/quieter",
    category: "refine",
    description: "Tone down busy designs — reduce noise, soften secondary elements, create breathing room.",
    trigger: "Too much competing for attention. Everything looks equally important. The page feels loud.",
    example: "/quieter",
  },
  {
    name: "/focus",
    category: "refine",
    description: "Sharpen the primary action — one dominant CTA, remove competing weights, clear the critical path.",
    trigger: "Multiple buttons feel equally prominent. The user's next step isn't obvious.",
    example: "/focus",
  },
  {
    name: "/colorize",
    category: "refine",
    description: "Add strategic color to a currently neutral UI using Zephr semantic tokens.",
    trigger: "The design is monochrome or grey-heavy and needs color to signal hierarchy or state.",
    example: "/colorize",
  },
  // ── Quality ────────────────────────────────────────────────────────────
  {
    name: "/audit",
    category: "quality",
    description: "Technical design audit — find token violations, missing states, and pattern inconsistencies.",
    trigger: "Before a PR review or design handoff. Catch regressions before they ship.",
    example: "/audit",
  },
  {
    name: "/harden",
    category: "quality",
    description: "Add missing states — error, loading, empty, disabled, success — to every component that needs them.",
    trigger: "Happy-path-only UI. Real data will expose missing empty and error states.",
    example: "/harden",
  },
  {
    name: "/token-check",
    category: "quality",
    description: "Find every hardcoded value that should be a Zephr design token — colors, radii, spacing, shadows.",
    trigger: "After a fast prototype pass where hardcoded hex and px values crept in.",
    example: "/token-check",
  },
  {
    name: "/normalize",
    category: "quality",
    description: "Align a component to Zephr design system conventions — correct tokens, imports, and API patterns.",
    trigger: "Component was written before adopting Zephr, or migrated from another library.",
    example: "/normalize",
  },
  {
    name: "/simplify",
    category: "quality",
    description: "Review changed code for reuse opportunities, quality issues, and efficiency problems, then fix them.",
    trigger: "After a messy refactor or when a component has grown too complex.",
    example: "/simplify",
  },
  // ── Adapt ──────────────────────────────────────────────────────────────
  {
    name: "/adapt",
    category: "adapt",
    description: "Adapt a component or layout for a different device or context — mobile, tablet, email, embed.",
    trigger: "Desktop-first layout that needs a mobile breakpoint, or a web component going into an email.",
    example: "/adapt mobile",
  },
  {
    name: "/animate",
    category: "adapt",
    description: "Add meaningful motion to state changes and micro-interactions using Zephr transition tokens.",
    trigger: "State transitions feel instant/jarring. Interactions lack tactile feedback.",
    example: "/animate",
  },
  {
    name: "/distill",
    category: "adapt",
    description: "Strip a UI to its essential structure — remove decoration, redundancy, and non-essential sections.",
    trigger: "Over-engineered layout. Design has scope crept. Need a clean minimal version.",
    example: "/distill",
  },
  // ── Context ────────────────────────────────────────────────────────────
  {
    name: "/teach-zephr",
    category: "context",
    description: "One-time project context gathering — personalizes all subsequent Zephr commands for your app.",
    trigger: "First time using Zephr on a new project. Run once, all future commands understand your stack.",
    example: "/teach-zephr",
  },
  {
    name: "/critique",
    category: "context",
    description: "UX and visual design review — hierarchy, CTA clarity, information density, and copy quality.",
    trigger: "Gut check before a design review. Get honest feedback on what's working and what isn't.",
    example: "/critique",
  },
  {
    name: "/clarify",
    category: "context",
    description: "Rewrite all UI copy to be clear, specific, and action-oriented.",
    trigger: "Placeholder copy shipped. Labels are vague. Buttons say 'Submit' instead of 'Save changes'.",
    example: "/clarify",
  },
  {
    name: "/annotate",
    category: "context",
    description: "Add inline comments explaining design decisions, token choices, and component structure.",
    trigger: "Handing off to a teammate. Documenting why a pattern was chosen.",
    example: "/annotate",
  },
];

const CATEGORIES: Array<{
  id: SlashCommand["category"];
  label: string;
  description: string;
  color: string;
}> = [
  { id: "build",   label: "Build",   description: "Create pages and layouts from scratch",          color: "var(--sc-cat-build)" },
  { id: "refine",  label: "Refine",  description: "Polish, tighten, and tune existing UI",           color: "var(--sc-cat-refine)" },
  { id: "quality", label: "Quality", description: "Audit, harden, and enforce token consistency",    color: "var(--sc-cat-quality)" },
  { id: "adapt",   label: "Adapt",   description: "Transform for device, motion, or simplification", color: "var(--sc-cat-adapt)" },
  { id: "context", label: "Context", description: "Review, teach, annotate, and clarify",            color: "var(--sc-cat-context)" },
];

interface SlashCommandsPageProps {
  onCopy: (label: string, value: string) => void;
  onNavigate?: (tab: string, view: string) => void;
}

export default function SlashCommandsPage({ onCopy, onNavigate }: SlashCommandsPageProps) {
  const [activeCategory, setActiveCategory] = useState<SlashCommand["category"] | "all">("all");
  const [query, setQuery] = useState("");

  const visible = COMMANDS.filter(cmd => {
    const catMatch = activeCategory === "all" || cmd.category === activeCategory;
    if (!catMatch) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return cmd.name.includes(q) || cmd.description.toLowerCase().includes(q) || cmd.trigger.toLowerCase().includes(q);
  });

  return (
    <>
      {/* Hero */}
      <section id="slash-overview" className="doc-section hero">
        <p className="breadcrumbs">Setup / Slash Commands</p>
        <h1>Slash commands</h1>
        <p className="lead">
          22 design operations built directly into your AI editor. Each command is a focused, repeatable action — from scaffolding full pages to auditing token violations to sharpening the primary CTA.
        </p>
        <div className="sc-hero-stats">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="sc-hero-stat">
              <strong style={{ color: cat.color }}>{COMMANDS.filter(c => c.category === cat.id).length}</strong>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
        <div className="sc-install-strip">
          <span className="sc-install-label">Install all commands</span>
          <code className="sc-install-cmd">zephr add-skills</code>
          <button
            type="button"
            className="sc-install-copy"
            onClick={() => onCopy("Install command", "zephr add-skills")}
            aria-label="Copy install command"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </button>
          <span className="sc-install-compat">Works in Claude Code · Cursor · Codex · Windsurf</span>
        </div>
      </section>

      {/* Toolbar */}
      <section className="doc-section sc-toolbar-section">
        <div className="sc-toolbar">
          <div className="sc-search-wrap">
            <svg className="sc-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
            </svg>
            <input
              className="sc-search"
              type="search"
              placeholder="Search commands…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search slash commands"
            />
          </div>
          <div className="sc-filter-row" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              className={`sc-filter ${activeCategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All <span className="sc-filter-count">{COMMANDS.length}</span>
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`sc-filter ${activeCategory === cat.id ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                style={activeCategory === cat.id ? { "--sc-filter-active-color": cat.color } as React.CSSProperties : undefined}
              >
                {cat.label} <span className="sc-filter-count">{COMMANDS.filter(c => c.category === cat.id).length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Command grid by category */}
      {visible.length === 0 ? (
        <section className="doc-section">
          <div className="sc-empty">
            <p>No commands match <strong>"{query}"</strong>.</p>
          </div>
        </section>
      ) : activeCategory !== "all" ? (
        <section id={`sc-cat-${activeCategory}`} className="doc-section">
          <div className="sc-grid">
            {visible.map(cmd => (
              <CommandCard key={cmd.name} cmd={cmd} onCopy={onCopy} />
            ))}
          </div>
        </section>
      ) : (
        CATEGORIES.map(cat => {
          const catCmds = visible.filter(c => c.category === cat.id);
          if (catCmds.length === 0) return null;
          return (
            <section key={cat.id} id={`sc-cat-${cat.id}`} className="doc-section">
              <div className="sc-section-head">
                <span className="sc-cat-dot" style={{ background: cat.color }} aria-hidden="true" />
                <div>
                  <h2>{cat.label}</h2>
                  <p>{cat.description}</p>
                </div>
              </div>
              <div className="sc-grid">
                {catCmds.map(cmd => (
                  <CommandCard key={cmd.name} cmd={cmd} onCopy={onCopy} />
                ))}
              </div>
            </section>
          );
        })
      )}

      {/* How to use footer */}
      <section id="sc-how-to-use" className="doc-section">
        <div className="section-heading">
          <h2>How to use</h2>
          <p>Any slash command works by typing it directly into your AI editor's chat panel.</p>
        </div>
        <div className="sc-how-grid">
          <div className="sc-how-card">
            <div className="sc-how-num">1</div>
            <div>
              <strong>Install the skill pack</strong>
              <p>Run <code>zephr add-skills</code> once. This registers all 22 commands with your AI editor.</p>
            </div>
          </div>
          <div className="sc-how-card">
            <div className="sc-how-num">2</div>
            <div>
              <strong>Identify the right command</strong>
              <p>Use the <em>trigger</em> column above — each command lists exactly when it applies.</p>
            </div>
          </div>
          <div className="sc-how-card">
            <div className="sc-how-num">3</div>
            <div>
              <strong>Type it in chat</strong>
              <p>Type <code>/command</code> optionally followed by arguments or context. The AI executes the operation against your current file.</p>
            </div>
          </div>
        </div>
        {onNavigate && (
          <DocPageNav
            prev={{ label: "Get Started", onClick: () => onNavigate("setup", "getting-started") }}
            next={{ label: "Foundations", onClick: () => onNavigate("setup", "foundations") }}
          />
        )}
      </section>
    </>
  );
}

function CommandCard({ cmd, onCopy }: { cmd: SlashCommand; onCopy: (label: string, value: string) => void }) {
  const catMeta = CATEGORIES.find(c => c.id === cmd.category)!;
  return (
    <article className={`sc-card sc-card--${cmd.category}`} aria-label={cmd.name}>
      <header className="sc-card-header">
        <div className="sc-card-name-row">
          <code className="sc-card-name">{cmd.name}</code>
          <span className="sc-card-cat" style={{ color: catMeta.color, borderColor: catMeta.color }}>
            {catMeta.label}
          </span>
        </div>
        <button
          type="button"
          className="sc-card-copy"
          onClick={() => onCopy(cmd.name, cmd.example)}
          aria-label={`Copy example prompt for ${cmd.name}`}
          title="Copy example"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </header>

      <p className="sc-card-desc">{cmd.description}</p>

      {cmd.args && (
        <div className="sc-card-args">
          <span className="sc-card-args-label">Args</span>
          <code>{cmd.args}</code>
        </div>
      )}

      <div className="sc-card-divider" />

      <div className="sc-card-trigger">
        <span className="sc-card-trigger-label">Use when</span>
        <p>{cmd.trigger}</p>
      </div>

      <div className="sc-card-example">
        <span className="sc-card-example-label">Example</span>
        <code>{cmd.example}</code>
      </div>
    </article>
  );
}
