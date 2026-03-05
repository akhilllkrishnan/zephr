"use client";
import { CSSProperties, ReactNode, useState } from "react";

/* ─────────────────────────────────────────────
   SVG helpers
───────────────────────────────────────────── */

const CheckSVG = ({ size = 10, color = "white" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   Left panel — step completion list
───────────────────────────────────────────── */

interface SetupItem {
  label: string;
  done: boolean;
  active: boolean;
}

function SetupChecklist({ items }: { items: SetupItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "11px 14px", borderRadius: "10px",
            background: item.active ? "rgba(255,255,255,0.08)" : "transparent",
            border: item.active ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
            transition: "background 0.2s ease",
          }}
        >
          <div style={{
            width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: item.done ? "#335cff" : item.active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
            border: item.done ? "none" : item.active ? "1.5px solid rgba(255,255,255,0.3)" : "1.5px solid rgba(255,255,255,0.12)",
            transition: "all 0.2s ease",
          }}>
            {item.done
              ? <CheckSVG size={9} />
              : <span style={{ fontSize: "10px", fontWeight: 700, color: item.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}>{i + 1}</span>
            }
          </div>
          <span style={{
            fontSize: "13.5px",
            fontWeight: item.active ? 600 : 400,
            color: item.done ? "rgba(255,255,255,0.5)" : item.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            letterSpacing: "-0.01em",
            textDecoration: item.done ? "line-through" : "none",
            transition: "color 0.2s ease",
          }}>
            {item.label}
          </span>
          {item.active && (
            <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#335cff", boxShadow: "0 0 8px rgba(51,92,255,0.8)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Inline styles
───────────────────────────────────────────── */

const STYLES = `
@keyframes ob-slide-in { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
@keyframes ob-fade-up  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes ob-spin     { to { transform:rotate(360deg); } }

.ob-root * { box-sizing:border-box; font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif; }

.ob-next-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 20px; border-radius:10px;
  font-size:14px; font-weight:600; color:white;
  cursor:pointer; border:none;
  background:#111827;
  box-shadow:0 1px 2px rgba(0,0,0,0.12);
  transition:background 100ms,box-shadow 100ms,transform 80ms;
  letter-spacing:-0.01em;
}
.ob-next-btn:hover { background:#0f172a; box-shadow:0 4px 12px rgba(0,0,0,0.18); transform:translateY(-1px); }
.ob-next-btn:active { transform:scale(0.99); }

.ob-back-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:9px 16px; border-radius:10px;
  font-size:13.5px; font-weight:500; color:#6b7280;
  cursor:pointer; border:1px solid #e5e7eb; background:#fff;
  transition:background 100ms,border-color 100ms;
  letter-spacing:-0.01em;
}
.ob-back-btn:hover { background:#f9fafb; border-color:#d1d5db; }

.ob-pack-card {
  display:flex; align-items:center; gap:14px;
  padding:12px 14px; border-radius:10px; cursor:pointer;
  border:1.5px solid #eaecf0; background:#fff;
  transition:border-color 120ms,box-shadow 120ms,background 120ms;
}
.ob-pack-card:hover { border-color:#c7d2fe; box-shadow:0 2px 8px rgba(51,92,255,0.06); }
.ob-pack-card.is-selected { border-color:#335cff; background:#f5f7ff; box-shadow:0 0 0 3px rgba(51,92,255,0.1); }

@media (max-width:560px) {
  .ob-left { display:none !important; }
}
`;

/* ─────────────────────────────────────────────
   Public types
───────────────────────────────────────────── */

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  nextLabel?: string;
  emoji?: string;
}

export interface OnboardingPageProps {
  steps?: OnboardingStep[];
  brand?: ReactNode;
  onComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

/* ─────────────────────────────────────────────
   Step content
───────────────────────────────────────────── */

const CODE_SNIPPET = `import { Button } from "@zephyr/ui-react";

export default function App() {
  return <Button>Hello Zephyr ⚡</Button>;
}`;

function WelcomeContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <p style={{ margin: 0, fontSize: "14.5px", color: "#6b7280", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
        Zephyr gives you 200+ production-ready React components, unified design tokens, and AI-powered tooling — everything you need to ship premium UI fast.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {[
          { icon: "⚡", label: "Zero config", desc: "Works out of the box" },
          { icon: "🎨", label: "6 style packs", desc: "Swap themes instantly" },
          { icon: "🤖", label: "AI-native", desc: "Built for LLM tooling" },
          { icon: "📦", label: "200+ comps",  desc: "Every pattern covered" },
        ].map(f => (
          <div key={f.label} style={{
            padding: "14px", borderRadius: "10px",
            background: "#f9fafb", border: "1px solid #f0f0f2",
          }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{f.icon}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>{f.label}</div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstallContent() {
  const [pm, setPm] = useState<"pnpm" | "npm" | "yarn">("pnpm");
  const cmds = {
    pnpm: "pnpm add @zephyr/ui-react",
    npm:  "npm install @zephyr/ui-react",
    yarn: "yarn add @zephyr/ui-react",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Package manager tabs */}
      <div style={{
        display: "inline-flex", background: "#f3f4f6", borderRadius: "8px", padding: "3px", gap: "2px",
      }}>
        {(["pnpm", "npm", "yarn"] as const).map(p => (
          <button key={p} type="button" onClick={() => setPm(p)} style={{
            padding: "4px 12px", borderRadius: "6px", border: "none",
            background: pm === p ? "#fff" : "transparent",
            color: pm === p ? "#111827" : "#6b7280",
            fontSize: "12.5px", fontWeight: pm === p ? 600 : 400,
            cursor: "pointer", boxShadow: pm === p ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            transition: "all 100ms",
          }}>{p}</button>
        ))}
      </div>

      {/* Terminal */}
      <div style={{ background: "#0f172a", borderRadius: "10px", padding: "14px 16px" }}>
        <div style={{ fontSize: "10.5px", color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Terminal</div>
        <code style={{ fontFamily: "'IBM Plex Mono', 'Fira Code', monospace", fontSize: "13.5px" }}>
          <span style={{ color: "#475569" }}>$</span>{" "}
          <span style={{ color: pm === "npm" ? "#e74c8b" : pm === "pnpm" ? "#f59e0b" : "#2b8fd7", fontWeight: 600 }}>
            {pm === "npm" ? "npm" : pm === "pnpm" ? "pnpm" : "yarn"}
          </span>{" "}
          <span style={{ color: "#60a5fa" }}>
            {pm === "npm" ? "install" : pm === "pnpm" ? "add" : "add"}
          </span>{" "}
          <span style={{ color: "#e2e8f0" }}>@zephyr/ui-react</span>
        </code>
      </div>

      {/* Usage */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px 16px" }}>
        <div style={{ fontSize: "10.5px", color: "#15803d", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Usage</div>
        <pre style={{ margin: 0, fontFamily: "'IBM Plex Mono', 'Fira Code', monospace", fontSize: "12px", color: "#166534", lineHeight: 1.7 }}>
          {CODE_SNIPPET}
        </pre>
      </div>
    </div>
  );
}

function ThemeContent() {
  const [selected, setSelected] = useState("notion");
  const packs = [
    { name: "notion", desc: "Warm white, flat-first and calm.", swatches: ["#121212", "#f5f5f5", "#ffffff"] },
    { name: "stripe", desc: "White dashboards with subtle elevation.", swatches: ["#4f46e5", "#e2e8f0", "#ffffff"] },
    { name: "linear", desc: "Data-dense UI with compact rhythm.", swatches: ["#245ef5", "#d1d5db", "#ffffff"] },
    { name: "framer", desc: "Expressive contrast and bold accents.", swatches: ["#9333ea", "#e2e8f0", "#ffffff"] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {packs.map(p => (
        <button
          key={p.name}
          type="button"
          className={`ob-pack-card${selected === p.name ? " is-selected" : ""}`}
          onClick={() => setSelected(p.name)}
        >
          {/* Color swatches */}
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            {p.swatches.map((c, j) => (
              <div key={j} style={{ width: "10px", height: "32px", borderRadius: "4px", background: c, border: "1px solid rgba(0,0,0,0.07)" }} />
            ))}
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>{p.name}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{p.desc}</div>
          </div>
          <div style={{
            width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
            background: selected === p.name ? "#335cff" : "#f3f4f6",
            border: selected === p.name ? "none" : "1.5px solid #e5e7eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 120ms",
          }}>
            {selected === p.name && <CheckSVG size={9} />}
          </div>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Default steps
───────────────────────────────────────────── */

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    emoji: "👋",
    title: "Welcome to Zephyr",
    subtitle: "The AI-native UI system — production-ready, beautiful by default.",
    nextLabel: "Get started",
    content: <WelcomeContent />,
  },
  {
    id: "install",
    emoji: "📦",
    title: "Install the package",
    subtitle: "One command, zero configuration required.",
    nextLabel: "Done, continue",
    content: <InstallContent />,
  },
  {
    id: "theme",
    emoji: "🎨",
    title: "Pick a style pack",
    subtitle: "You can switch anytime — no code changes required.",
    nextLabel: "Finish setup",
    content: <ThemeContent />,
  },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export function OnboardingPage({
  steps = DEFAULT_STEPS,
  brand,
  onComplete,
  className,
  style,
}: OnboardingPageProps) {
  const [idx, setIdx] = useState(0);
  const step  = steps[idx];
  const isLast = idx === steps.length - 1;
  const pct   = Math.round(((idx + 1) / steps.length) * 100);

  const checklistItems: SetupItem[] = steps.map((s, i) => ({
    label: s.title,
    done:  i < idx,
    active: i === idx,
  }));

  return (
    <div
      className={`ob-root${className ? ` ${className}` : ""}`}
      style={{ minHeight: "760px", display: "grid", gridTemplateColumns: "2fr 3fr", ...style }}
    >
      <style>{STYLES}</style>

      {/* ═══ LEFT — dark panel ═══ */}
      <div
        className="ob-left"
        style={{
          position: "relative", overflow: "hidden",
          background: "#0a0d14",
          display: "flex", flexDirection: "column",
          padding: "clamp(2rem, 3.5vw, 3rem)",
        }}
      >
        {/* Ambient glows */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-15%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.2) 0%, transparent 70%)", filter: "blur(48px)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div aria-hidden style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(51,92,255,0.5) 40%, rgba(99,102,241,0.4) 60%, transparent)" }} />

        {/* Brand */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "auto" }}>
          {brand ?? (
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "8px",
                background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(51,92,255,0.35)",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em" }}>Zephyr</span>
            </div>
          )}
        </div>

        {/* Setup progress headline */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "24px" }}>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            Setup progress
          </p>
          <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 1.2 }}>
            {pct === 100 ? "All done! 🎉" : `${pct}% complete`}
          </h2>
          <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #335cff, #6366f1)", borderRadius: "99px", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Step checklist */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "32px" }}>
          <SetupChecklist items={checklistItems} />
        </div>

        {/* Bottom tagline */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px", padding: "16px",
          }}>
            <p style={{ margin: "0 0 10px", fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", fontStyle: "italic", letterSpacing: "-0.01em" }}>
              &ldquo;Takes about 3 minutes to get from zero to production-ready UI.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #335cff, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "white" }}>SC</div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Sarah Chen</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>Staff Eng, Vercel</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT — wizard ═══ */}
      <div style={{
        background: "#ffffff",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(2rem, 5vw, 4rem)",
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>

          {/* Step dots indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "36px" }}>
            {steps.map((s, i) => {
              const done = i < idx;
              const active = i === idx;
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: done ? "#111827" : active ? "#fff" : "#f3f4f6",
                      border: active ? "2px solid #111827" : done ? "none" : "2px solid #e5e7eb",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: active ? "0 0 0 4px rgba(17,24,39,0.08)" : "none",
                      transition: "all 0.25s ease",
                      flexShrink: 0,
                    }}>
                      {done
                        ? <CheckSVG size={11} color="white" />
                        : <span style={{ fontSize: "11px", fontWeight: 700, color: active ? "#111827" : "#9ca3af" }}>{i + 1}</span>
                      }
                    </div>
                    <span style={{ fontSize: "10.5px", fontWeight: active ? 600 : 400, color: active ? "#111827" : done ? "#9ca3af" : "#c4c9d4", letterSpacing: "-0.005em", whiteSpace: "nowrap" }}>
                      {s.id.charAt(0).toUpperCase() + s.id.slice(1)}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ flex: 1, height: "2px", background: done ? "#111827" : "#e5e7eb", margin: "0 8px", marginBottom: "18px", borderRadius: "999px", transition: "background 0.3s ease" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <div key={idx} style={{ animation: "ob-slide-in 0.3s ease both" }}>
            {/* Emoji icon */}
            {step?.emoji && (
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "linear-gradient(135deg, #f3f4f6, #ffffff)",
                border: "1px solid #eaecf0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", marginBottom: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}>
                {step.emoji}
              </div>
            )}

            {/* Heading */}
            <h2 style={{ margin: "0 0 6px", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.04em", color: "#0f172a", lineHeight: 1.2 }}>
              {step?.title}
            </h2>
            {step?.subtitle && (
              <p style={{ margin: "0 0 24px", fontSize: "14.5px", color: "#6b7280", lineHeight: 1.6, letterSpacing: "-0.01em" }}>
                {step.subtitle}
              </p>
            )}

            {/* Content */}
            <div style={{ marginBottom: "28px" }}>
              {step?.content}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                {idx > 0 && (
                  <button type="button" className="ob-back-btn" onClick={() => setIdx(i => Math.max(0, i - 1))}>
                    ← Back
                  </button>
                )}
              </div>
              <button
                type="button"
                className="ob-next-btn"
                onClick={() => isLast ? onComplete?.() : setIdx(i => i + 1)}
              >
                {step?.nextLabel ?? (isLast ? "Finish" : "Continue")}
                {!isLast && <ArrowRight />}
              </button>
            </div>
          </div>

          <p style={{ marginTop: "20px", textAlign: "center", fontSize: "12px", color: "#c4c9d4", letterSpacing: "-0.005em" }}>
            You can change these settings anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
