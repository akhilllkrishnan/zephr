"use client";
import { CSSProperties, ReactNode } from "react";

/* ─────────────────────────────────────────────
   SVG helpers
───────────────────────────────────────────── */

const CheckSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#335cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   Hero product mockup SVG
───────────────────────────────────────────── */

function ProductMockup() {
  return (
    <svg
      viewBox="0 0 860 460"
      width="100%"
      style={{ borderRadius: "12px", display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Browser chrome */}
      <rect width="860" height="460" rx="10" fill="#0f1420" />
      <rect width="860" height="38" rx="0" fill="#161b2e" />
      <rect y="0" width="860" height="38" rx="10" fill="#161b2e" />
      <rect y="28" width="860" height="10" fill="#161b2e" />
      {/* Traffic lights */}
      <circle cx="20" cy="19" r="5" fill="#ff5f57" />
      <circle cx="36" cy="19" r="5" fill="#febc2e" />
      <circle cx="52" cy="19" r="5" fill="#28c840" />
      {/* Address bar */}
      <rect x="180" y="10" width="500" height="18" rx="5" fill="#1e2538" />
      <text x="430" y="22.5" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="-apple-system,sans-serif">zephr.app/dashboard</text>

      {/* App sidebar */}
      <rect x="0" y="38" width="190" height="422" fill="#111827" />
      {/* Sidebar brand */}
      <rect x="16" y="56" width="26" height="26" rx="7" fill="url(#mpGrad)" />
      <text x="46" y="74" fill="rgba(255,255,255,0.9)" fontSize="13" fontWeight="700" fontFamily="-apple-system,sans-serif" letterSpacing="-0.5">Zephr</text>
      {/* Sidebar items */}
      {[
        { y: 104, label: "Dashboard", active: true },
        { y: 128, label: "Components", active: false },
        { y: 152, label: "Style Packs", active: false },
        { y: 176, label: "Settings", active: false },
      ].map(item => (
        <g key={item.y}>
          {item.active && <rect x="8" y={item.y - 10} width="174" height="26" rx="6" fill="rgba(51,92,255,0.2)" />}
          {item.active && <rect x="8" y={item.y - 10} width="3" height="26" rx="2" fill="#335cff" />}
          <text x="24" y={item.y + 8} fill={item.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)"} fontSize="12" fontFamily="-apple-system,sans-serif" fontWeight={item.active ? "600" : "400"}>{item.label}</text>
        </g>
      ))}

      {/* Main content area */}
      <rect x="190" y="38" width="670" height="422" fill="#f8fafc" />

      {/* Top bar */}
      <rect x="190" y="38" width="670" height="48" fill="#ffffff" />
      <rect x="190" y="85" width="670" height="1" fill="#e2e8f0" />
      <text x="210" y="68" fill="#0f172a" fontSize="16" fontWeight="700" fontFamily="-apple-system,sans-serif" letterSpacing="-0.5">Dashboard</text>
      {/* Search bar */}
      <rect x="500" y="52" width="160" height="22" rx="6" fill="#f1f5f9" />
      <text x="512" y="66" fill="#94a3b8" fontSize="10" fontFamily="-apple-system,sans-serif">Search...</text>
      {/* Avatar */}
      <circle cx="790" cy="63" r="14" fill="url(#mpGrad)" />
      <text x="790" y="67.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="-apple-system,sans-serif">SC</text>

      {/* Stat cards */}
      {[
        { x: 210, label: "Components", value: "200+", sub: "foundation to pages", color: "#335cff" },
        { x: 380, label: "Widgets", value: "40+", sub: "real product blocks", color: "#8b5cf6" },
        { x: 550, label: "AI Prompts", value: "48", sub: "context-ready snippets", color: "#06b6d4" },
        { x: 720, label: "Saved Time", value: "3×", sub: "faster first ship", color: "#10b981" },
      ].map(card => (
        <g key={card.x}>
          <rect x={card.x} y="100" width="150" height="78" rx="10" fill="#ffffff" />
          <rect x={card.x} y="100" width="150" height="78" rx="10" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          <text x={card.x + 14} y="122" fill="#64748b" fontSize="11" fontFamily="-apple-system,sans-serif">{card.label}</text>
          <text x={card.x + 14} y="148" fill="#0f172a" fontSize="22" fontWeight="800" fontFamily="-apple-system,sans-serif" letterSpacing="-1">{card.value}</text>
          <text x={card.x + 14} y="166" fill={card.color} fontSize="10" fontFamily="-apple-system,sans-serif">{card.sub}</text>
          <rect x={card.x + 118} y="104" width="28" height="28" rx="8" fill={`${card.color}18`} />
          <rect x={card.x + 124} y="114" width="16" height="8" rx="3" fill={card.color} opacity="0.6" />
          <rect x={card.x + 124} y="110" width="10" height="12" rx="2" fill={card.color} opacity="0.3" />
        </g>
      ))}

      {/* Component grid section */}
      <rect x="210" y="194" width="320" height="250" rx="10" fill="#ffffff" />
      <rect x="210" y="194" width="320" height="250" rx="10" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      <text x="226" y="218" fill="#0f172a" fontSize="13" fontWeight="700" fontFamily="-apple-system,sans-serif" letterSpacing="-0.3">Component Library</text>
      <text x="226" y="232" fill="#94a3b8" fontSize="10" fontFamily="-apple-system,sans-serif">29 free · 29 Pro</text>

      {/* Mini component cards */}
      {[
        { x: 226, y: 246, name: "Button", bg: "#f8fafc" },
        { x: 326, y: 246, name: "Input", bg: "#f8fafc" },
        { x: 426, y: 246, name: "Badge", bg: "#f8fafc" },
        { x: 226, y: 316, name: "Avatar", bg: "#f8fafc" },
        { x: 326, y: 316, name: "Switch", bg: "#f8fafc" },
        { x: 426, y: 316, name: "Card", bg: "#f8fafc" },
      ].map(comp => (
        <g key={`${comp.x}-${comp.y}`}>
          <rect x={comp.x} y={comp.y} width="90" height="62" rx="7" fill={comp.bg} />
          <rect x={comp.x} y={comp.y} width="90" height="62" rx="7" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          {/* Icon placeholder */}
          <rect x={comp.x + 30} y={comp.y + 12} width="30" height="22" rx="4" fill="#e2e8f0" />
          <text x={comp.x + 45} y={comp.y + 52} textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="-apple-system,sans-serif" fontWeight="600">{comp.name}</text>
        </g>
      ))}

      {/* Widget catalog section */}
      <rect x="544" y="194" width="316" height="250" rx="10" fill="#ffffff" />
      <rect x="544" y="194" width="316" height="250" rx="10" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      <text x="560" y="218" fill="#0f172a" fontSize="13" fontWeight="700" fontFamily="-apple-system,sans-serif" letterSpacing="-0.3">Premium widgets</text>
      <text x="560" y="232" fill="#94a3b8" fontSize="10" fontFamily="-apple-system,sans-serif">workflows, forms, metrics, AI</text>

      {/* Widget cards */}
      {[
        { x: 560, y: 244, name: "Approval", color1: "#f97316", color2: "#fdba74", badge: "Workflow" },
        { x: 680, y: 244, name: "Composer", color1: "#7c3aed", color2: "#c4b5fd", badge: "AI" },
        { x: 560, y: 330, name: "Insights", color1: "#06b6d4", color2: "#67e8f9", badge: "Metrics" },
        { x: 680, y: 330, name: "Onboarding", color1: "#10b981", color2: "#86efac", badge: "Setup" },
      ].map(pack => (
        <g key={pack.name}>
          <rect x={pack.x} y={pack.y} width="106" height="72" rx="8" fill="#f8fafc" />
          <rect x={pack.x} y={pack.y} width="106" height="72" rx="8" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx={pack.x + 18} cy={pack.y + 26} r="10" fill={pack.color1} />
          <circle cx={pack.x + 34} cy={pack.y + 26} r="10" fill={pack.color2} />
          <circle cx={pack.x + 50} cy={pack.y + 26} r="10" fill="#ffffff" />
          <text x={pack.x + 10} y={pack.y + 52} fill="#0f172a" fontSize="11" fontWeight="600" fontFamily="-apple-system,sans-serif">{pack.name}</text>
          <rect x={pack.x + 58} y={pack.y + 8} width="40" height="14" rx="4" fill="rgba(51,92,255,0.1)" />
          <text x={pack.x + 78} y={pack.y + 18} textAnchor="middle" fill="#335cff" fontSize="8.5" fontWeight="700" fontFamily="-apple-system,sans-serif">{pack.badge}</text>
        </g>
      ))}

      {/* Gradient defs */}
      <defs>
        <linearGradient id="mpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#335cff" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Inline styles
───────────────────────────────────────────── */

const STYLES = `
.mp-root * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }

/* Navbar */
.mp-nav-link {
  font-size: 13.5px; font-weight: 500; color: rgba(255,255,255,0.55);
  text-decoration: none; cursor: pointer; transition: color 150ms;
  padding: 4px 0;
}
.mp-nav-link:hover { color: rgba(255,255,255,0.9); }

/* Buttons */
.mp-cta-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 10px;
  background: #ffffff; color: #0f172a;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  border: none; cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transition: background 100ms, box-shadow 100ms, transform 80ms;
}
.mp-cta-primary:hover { background: #f0f4ff; box-shadow: 0 4px 16px rgba(0,0,0,0.15); transform: translateY(-1px); }
.mp-cta-primary:active { transform: scale(0.99); }

.mp-cta-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; border-radius: 10px;
  background: transparent; color: rgba(255,255,255,0.75);
  font-size: 14px; font-weight: 500; letter-spacing: -0.01em;
  border: 1px solid rgba(255,255,255,0.18); cursor: pointer;
  transition: border-color 100ms, color 100ms, background 100ms;
}
.mp-cta-secondary:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.95); background: rgba(255,255,255,0.06); }

/* Feature cards */
.mp-feature-card {
  padding: 24px; border-radius: 12px;
  background: #ffffff; border: 1px solid #eaecf0;
  transition: border-color 150ms, box-shadow 150ms, transform 150ms;
}
.mp-feature-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(51,92,255,0.07); transform: translateY(-2px); }

/* Testimonial cards */
.mp-testimonial-card {
  padding: 28px; border-radius: 14px;
  background: #ffffff; border: 1px solid #eaecf0;
}

/* Pricing cards */
.mp-plan-card {
  padding: 28px; border-radius: 14px;
  background: #ffffff; border: 1px solid #eaecf0;
  position: relative;
  transition: border-color 150ms, box-shadow 150ms;
}
.mp-plan-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 24px rgba(51,92,255,0.08); }
.mp-plan-card.is-pro {
  background: #0f172a; border-color: #1e293b;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
}
.mp-plan-card.is-pro:hover { border-color: #334155; box-shadow: 0 12px 48px rgba(0,0,0,0.35); }

/* Plan CTA buttons */
.mp-plan-btn {
  width: 100%; padding: 10px; border-radius: 9px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  border: 1px solid #e2e8f0; background: #ffffff; color: #0f172a;
  transition: background 100ms, border-color 100ms;
  letter-spacing: -0.01em;
}
.mp-plan-btn:hover { background: #f8fafc; border-color: #c7d2fe; }
.mp-plan-btn.is-pro {
  background: #335cff; color: #ffffff;
  border: none;
  box-shadow: 0 1px 2px rgba(51,92,255,0.3), 0 4px 12px rgba(51,92,255,0.25);
}
.mp-plan-btn.is-pro:hover { background: #2448e8; box-shadow: 0 1px 2px rgba(51,92,255,0.4), 0 6px 16px rgba(51,92,255,0.35); }

/* Footer install command */
.mp-install-cmd {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 10px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  font-size: 14px; color: rgba(255,255,255,0.85);
  font-family: 'SF Mono','JetBrains Mono','Fira Code',monospace;
  letter-spacing: -0.02em;
}

@keyframes mp-fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
`;

/* ─────────────────────────────────────────────
   Public types
───────────────────────────────────────────── */

export interface MarketingFeature {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface MarketingPricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
}

export interface MarketingLogo {
  name: string;
  src?: string;
}

export interface MarketingTestimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatarColor?: string;
}

export interface MarketingPageProps {
  brand?: ReactNode;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBadge?: string;
  features?: MarketingFeature[];
  pricingPlans?: MarketingPricingPlan[];
  logos?: MarketingLogo[];
  testimonials?: MarketingTestimonial[];
  ctaLabel?: string;
  secondaryCtaLabel?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

/* ─────────────────────────────────────────────
   Default data
───────────────────────────────────────────── */

const defaultFeatures: MarketingFeature[] = [
  { id: "f1", title: "Zero Config", description: "One install command, works immediately. No setup files, no config, no fighting with build tools.", icon: "⚡" },
  { id: "f2", title: "AI-Native", description: "Every component ships with an AI prompt. Claude, Cursor, and Copilot understand your UI out of the box.", icon: "🤖" },
  { id: "f3", title: "Premium default theme", description: "One polished visual system with accent customization, premium spacing, and consistent surfaces across the whole product.", icon: "🎨" },
  { id: "f4", title: "Dark Mode Built-in", description: "Every token has a dark-mode variant. Light/dark switching works without extra code.", icon: "🌙" },
  { id: "f5", title: "No Utility Classes", description: "Components self-style via CSS variables. Zero Tailwind dependency, zero className pollution.", icon: "✂️" },
  { id: "f6", title: "Free to Start", description: "All 55 components, 4 style packs, and CLI tools — completely free, no account required. Pay once for premium page examples.", icon: "🎁" }
];

const defaultPlans: MarketingPricingPlan[] = [
  {
    id: "templates",
    name: "Zephr Templates",
    price: "$49",
    period: "one-time",
    description: "Lifetime access to all 20 premium page examples. All future examples included.",
    features: [
      "20 production-ready page examples",
      "Ops Center, CRM, Analytics, Support Desk, and more",
      "All future examples included",
      "Use in unlimited projects",
      "License key — instant delivery",
    ],
    ctaLabel: "Get Templates",
    highlighted: true,
  },
];

const defaultLogos = ["Vercel", "Supabase", "Stripe", "Linear", "Notion", "Planetscale"];

const defaultTestimonials: MarketingTestimonial[] = [
  {
    id: "t1",
    quote: "Zephr cut our component development time in half. The AI prompts are genuinely useful — not a gimmick.",
    name: "Sarah Chen",
    title: "Staff Engineer, Vercel",
    avatarColor: "#335cff",
  },
  {
    id: "t2",
    quote: "We switched from shadcn and haven't looked back. Style packs make every project feel uniquely designed.",
    name: "Marcus Rodriguez",
    title: "Design Lead, Linear",
    avatarColor: "#8b5cf6",
  },
  {
    id: "t3",
    quote: "Finally, a component library that AI tools actually understand. Our team ships features 3× faster now.",
    name: "Priya Patel",
    title: "CTO, Acme Labs",
    avatarColor: "#10b981",
  }
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export function MarketingPage({
  brand,
  heroTitle = "Build beautiful UIs — instantly.",
  heroSubtitle = "The AI-native component system. 200+ components, premium widgets, zero config, and a polished default visual system. Ship production UI in minutes.",
  heroBadge = "New in v0.4",
  features = defaultFeatures,
  pricingPlans = defaultPlans,
  logos = defaultLogos as unknown as MarketingLogo[],
  testimonials = defaultTestimonials,
  ctaLabel = "Get Started Free",
  secondaryCtaLabel = "View Docs",
  onCtaClick,
  onSecondaryCtaClick,
  className,
  style,
}: MarketingPageProps) {
  return (
    <div
      className={`mp-root${className ? ` ${className}` : ""}`}
      style={{ background: "#ffffff", ...style }}
    >
      <style>{STYLES}</style>

      {/* ═══ HERO — dark section ═══ */}
      <section style={{
        background: "#0a0d14",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "0",
      }}>
        {/* Ambient glows */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "20%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.18) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "30%", right: "-10%", width: "40%", height: "40%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(51,92,255,0.6) 40%, rgba(99,102,241,0.5) 60%, transparent)" }} />
          {/* Dot grid */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mp-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.5)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mp-dots)" />
          </svg>
        </div>

        {/* Navbar */}
        <nav style={{
          position: "relative", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
          height: "60px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* Brand */}
          {brand ?? (
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "linear-gradient(135deg, #335cff 0%, #6366f1 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(51,92,255,0.35)",
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em" }}>Zephr</span>
            </div>
          )}

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {["Docs", "Components", "Widgets", "Pricing"].map(link => (
              <span key={link} className="mp-nav-link">{link}</span>
            ))}
          </div>

          {/* Right CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="mp-nav-link" style={{ cursor: "pointer" }}>Sign in</span>
            <button className="mp-cta-primary" style={{ padding: "7px 16px", fontSize: "13px" }} onClick={onCtaClick}>
              Get started
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 1,
          textAlign: "center",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem) 0",
          maxWidth: "860px",
          margin: "0 auto",
        }}>
          {/* Badge */}
          {heroBadge && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 14px", borderRadius: "99px",
              background: "rgba(51,92,255,0.15)", border: "1px solid rgba(51,92,255,0.3)",
              marginBottom: "24px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#335cff", display: "block", boxShadow: "0 0 8px rgba(51,92,255,0.9)" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#93b4ff", letterSpacing: "0.01em" }}>{heroBadge}</span>
            </div>
          )}

          {/* Headline */}
          <h1 style={{
            margin: "0 0 20px",
            fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.05em",
          }}>
            {heroTitle}
          </h1>

          {/* Subheadline */}
          <p style={{
            margin: "0 auto 32px",
            maxWidth: "560px",
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            letterSpacing: "-0.01em",
          }}>
            {heroSubtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
            <button className="mp-cta-primary" onClick={onCtaClick}>
              {ctaLabel}
              <ArrowRight size={14} color="#0f172a" />
            </button>
            <button className="mp-cta-secondary" onClick={onSecondaryCtaClick}>
              {secondaryCtaLabel}
            </button>
          </div>
        </div>

        {/* Product mockup */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 3vw, 2rem)",
          paddingBottom: 0,
        }}>
          <div style={{
            borderRadius: "12px 12px 0 0",
            border: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "none",
            overflow: "hidden",
            boxShadow: "0 -20px 80px rgba(51,92,255,0.15), 0 0 0 1px rgba(255,255,255,0.06)",
          }}>
            <ProductMockup />
          </div>
        </div>
      </section>

      {/* ═══ LOGOS ═══ */}
      <section style={{
        padding: "40px clamp(1.5rem, 4vw, 3rem)",
        borderBottom: "1px solid #f0f2f5",
        background: "#fafbfc",
      }}>
        <p style={{
          textAlign: "center",
          margin: "0 0 24px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#94a3b8",
        }}>
          Trusted by developers at
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(1.5rem, 4vw, 3.5rem)", flexWrap: "wrap" }}>
          {(logos as Array<{ name: string } | string>).map((logo, i) => {
            const name = typeof logo === "string" ? logo : logo.name;
            return (
              <span key={name} style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "-0.02em",
                opacity: 0.7 + (i % 3) * 0.1,
              }}>
                {name}
              </span>
            );
          })}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      {features.length > 0 && (
        <section style={{ padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)", maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ margin: "0 0 10px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#335cff" }}>
              Why Zephr
            </p>
            <h2 style={{ margin: "0 0 14px", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.15 }}>
              Everything you need to ship
            </h2>
            <p style={{ margin: 0, maxWidth: "520px", marginLeft: "auto", marginRight: "auto", fontSize: "16px", color: "#64748b", lineHeight: 1.7 }}>
              Production-ready components with a workflow built for AI-assisted development.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {features.map((feature) => (
              <div key={feature.id} className="mp-feature-card">
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #f0f4ff, #e8eeff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", marginBottom: "16px",
                  border: "1px solid rgba(51,92,255,0.1)",
                }}>
                  {feature.icon as ReactNode}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
                  {feature.title}
                </h3>
                <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b", lineHeight: 1.7 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ TESTIMONIALS ═══ */}
      {testimonials.length > 0 && (
        <section style={{ padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)", background: "#f8fafc" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ margin: "0 0 10px", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em" }}>
                Loved by builders
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "16px" }}>
                Join thousands of developers shipping faster with Zephr.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {testimonials.map((t) => (
                <div key={t.id} className="mp-testimonial-card">
                  {/* Quote mark */}
                  <div style={{ fontSize: "36px", color: "#335cff", lineHeight: 1, marginBottom: "12px", fontFamily: "Georgia, serif" }}>&ldquo;</div>
                  <p style={{ margin: "0 0 20px", fontSize: "14.5px", color: "#334155", lineHeight: 1.75, letterSpacing: "-0.01em" }}>
                    {t.quote}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: t.avatarColor ?? "#335cff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 700, color: "#fff",
                      flexShrink: 0,
                    }}>
                      {t.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>{t.name}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ PRICING ═══ */}
      {pricingPlans.length > 0 && (
        <section style={{ padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)", maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em" }}>
              One plan. One price.
            </h2>
            <p style={{ margin: 0, fontSize: "16px", color: "#64748b" }}>
              All components are free. Pay once to unlock premium page examples.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(pricingPlans.length, 3)}, minmax(0, 420px))`, gap: "16px", alignItems: "start", justifyContent: "center" }}>
            {pricingPlans.map((plan) => {
              const isPro = plan.highlighted;
              return (
                <div key={plan.id} className={`mp-plan-card${isPro ? " is-pro" : ""}`}>
                  {isPro && (
                    <div style={{
                      position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                      padding: "3px 12px", borderRadius: "99px",
                      background: "linear-gradient(135deg, #335cff, #6366f1)",
                      fontSize: "11px", fontWeight: 700, color: "#ffffff",
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: isPro ? "rgba(255,255,255,0.9)" : "#0f172a", letterSpacing: "-0.02em" }}>
                      {plan.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "12px 0 8px" }}>
                      <span style={{ fontSize: "36px", fontWeight: 800, color: isPro ? "#ffffff" : "#0f172a", letterSpacing: "-0.04em", lineHeight: 1 }}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span style={{ fontSize: "14px", color: isPro ? "rgba(255,255,255,0.4)" : "#94a3b8" }}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: "13.5px", color: isPro ? "rgba(255,255,255,0.5)" : "#64748b", lineHeight: 1.5 }}>
                      {plan.description}
                    </p>
                  </div>
                  <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {plan.features.map((feat) => (
                      <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13.5px", color: isPro ? "rgba(255,255,255,0.75)" : "#334155" }}>
                        {isPro
                          ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12" /></svg>
                          : <CheckSVG />
                        }
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`mp-plan-btn${isPro ? " is-pro" : ""}`} onClick={plan.onCtaClick}>
                    {plan.ctaLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{
        background: "#0a0d14",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Glow */}
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", height: "200%", borderRadius: "50%", background: "radial-gradient(circle, rgba(51,92,255,0.15) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.045em", lineHeight: 1.15 }}>
            Ready to start building?
          </h2>
          <p style={{ margin: "0 0 32px", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            Install Zephr and ship beautiful interfaces in minutes.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: "24px" }}>
            <div className="mp-install-cmd">
              <span style={{ color: "rgba(255,255,255,0.35)" }}>$</span>
              <span>npm install @zephrui/ui-react</span>
            </div>
          </div>
          <button className="mp-cta-primary" style={{ margin: "0 auto" }} onClick={onCtaClick}>
            {ctaLabel}
            <ArrowRight size={14} color="#0f172a" />
          </button>
          <p style={{ margin: "16px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
            No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
