"use client";
import { CSSProperties, ReactNode, useState } from "react";
import { Button } from "../atoms/Button";
import { Stack } from "../layout/Stack";
import { Box } from "../layout/Box";

/* ---------- Step illustration SVGs ---------- */

const WelcomeIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" style={{ width: "100%", maxWidth: "180px" }}>
    <rect x="20" y="30" width="160" height="100" rx="12" fill="color-mix(in srgb, var(--z-color-primary, #121212) 8%, transparent)" stroke="var(--z-color-border, #e5e5e5)" strokeWidth="1" />
    <rect x="35" y="50" width="50" height="8" rx="4" fill="var(--z-color-primary, #121212)" opacity="0.6" />
    <rect x="35" y="66" width="80" height="6" rx="3" fill="var(--z-color-border, #e5e5e5)" />
    <rect x="35" y="80" width="65" height="6" rx="3" fill="var(--z-color-border, #e5e5e5)" />
    <rect x="35" y="100" width="45" height="16" rx="8" fill="var(--z-color-primary, #121212)" />
    <circle cx="150" cy="55" r="16" fill="color-mix(in srgb, var(--z-color-accent, #fa7319) 20%, transparent)" stroke="var(--z-color-accent, #fa7319)" strokeWidth="1.5" />
    <path d="M145 55l4 4 8-8" stroke="var(--z-color-accent, #fa7319)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstallIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" style={{ width: "100%", maxWidth: "180px" }}>
    <rect x="25" y="25" width="150" height="110" rx="8" fill="var(--z-color-surface, #fff)" stroke="var(--z-color-border, #e5e5e5)" strokeWidth="1" />
    <rect x="25" y="25" width="150" height="24" rx="8" fill="color-mix(in srgb, var(--z-color-primary, #121212) 6%, transparent)" />
    <circle cx="40" cy="37" r="4" fill="var(--z-color-danger, #ef4444)" opacity="0.5" />
    <circle cx="52" cy="37" r="4" fill="var(--z-color-accent, #fa7319)" opacity="0.5" />
    <circle cx="64" cy="37" r="4" fill="var(--z-color-success, #059669)" opacity="0.5" />
    <text x="35" y="68" fontFamily="monospace" fontSize="9" fill="var(--z-color-muted, #5c5c5c)">$</text>
    <rect x="45" y="60" width="95" height="10" rx="3" fill="color-mix(in srgb, var(--z-color-primary, #121212) 10%, transparent)" />
    <text x="35" y="88" fontFamily="monospace" fontSize="9" fill="var(--z-color-success, #059669)">✓</text>
    <rect x="45" y="80" width="70" height="10" rx="3" fill="color-mix(in srgb, var(--z-color-success, #059669) 10%, transparent)" />
    <rect x="45" y="100" width="55" height="10" rx="3" fill="color-mix(in srgb, var(--z-color-primary, #121212) 6%, transparent)" />
  </svg>
);

const ThemeIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" style={{ width: "100%", maxWidth: "180px" }}>
    <rect x="20" y="30" width="70" height="50" rx="8" fill="var(--z-color-surface, #fff)" stroke="var(--z-color-border, #e5e5e5)" strokeWidth="1" />
    <rect x="28" y="38" width="30" height="5" rx="2.5" fill="var(--z-color-primary, #121212)" opacity="0.5" />
    <rect x="28" y="48" width="50" height="4" rx="2" fill="var(--z-color-border, #e5e5e5)" />
    <rect x="28" y="58" width="22" height="12" rx="6" fill="var(--z-color-primary, #121212)" />

    <rect x="110" y="30" width="70" height="50" rx="8" fill="#fff6d5" stroke="#000" strokeWidth="2" />
    <rect x="118" y="38" width="30" height="5" rx="2.5" fill="#000" opacity="0.5" />
    <rect x="118" y="48" width="50" height="4" rx="2" fill="#000" opacity="0.2" />
    <rect x="118" y="58" width="22" height="12" rx="2" fill="#ff2955" />

    <rect x="20" y="95" width="70" height="50" rx="8" fill="#f8f5f1" stroke="#d6d3d1" strokeWidth="1" />
    <rect x="28" y="103" width="30" height="5" rx="2.5" fill="#1d4ed8" opacity="0.5" />
    <rect x="28" y="113" width="50" height="4" rx="2" fill="#d6d3d1" />
    <rect x="28" y="123" width="22" height="12" rx="6" fill="#1d4ed8" />

    <rect x="110" y="95" width="70" height="50" rx="8" fill="#f4f7ff" stroke="#dbeafe" strokeWidth="1" />
    <rect x="118" y="103" width="30" height="5" rx="2.5" fill="#3b82f6" opacity="0.5" />
    <rect x="118" y="113" width="50" height="4" rx="2" fill="#dbeafe" />
    <rect x="118" y="123" width="22" height="12" rx="10" fill="#3b82f6" />
  </svg>
);

const stepIllustrations: Record<string, ReactNode> = {
  welcome: <WelcomeIllustration />,
  install: <InstallIllustration />,
  theme: <ThemeIllustration />
};

/* ---------- Step indicator ---------- */

function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                fontWeight: 700,
                background: isCompleted
                  ? "var(--z-color-primary, #121212)"
                  : isCurrent
                    ? "transparent"
                    : "transparent",
                color: isCompleted
                  ? "var(--z-color-primaryContrast, #fff)"
                  : isCurrent
                    ? "var(--z-color-primary, #121212)"
                    : "var(--z-color-muted, #5c5c5c)",
                border: isCurrent
                  ? "2px solid var(--z-color-primary, #121212)"
                  : isCompleted
                    ? "none"
                    : "1.5px solid var(--z-color-border, #e5e5e5)",
                transition: "all 0.25s ease"
              }}
            >
              {isCompleted ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < total - 1 ? (
              <div
                style={{
                  width: "32px",
                  height: "2px",
                  background: i < current
                    ? "var(--z-color-primary, #121212)"
                    : "var(--z-color-border, #e5e5e5)",
                  transition: "background 0.25s ease"
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  /** Label for the "next" button on this step */
  nextLabel?: string;
}

export interface OnboardingPageProps {
  steps?: OnboardingStep[];
  brand?: ReactNode;
  onComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Zephyr",
    subtitle: "Let\u2019s get you set up in 3 quick steps.",
    nextLabel: "Get started",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--z-space-3, 0.75rem)" }}>
        <p style={{ margin: 0, color: "var(--z-color-muted,#5c5c5c)", fontSize: "0.9rem", lineHeight: 1.6 }}>
          Zephyr is an AI-native design system. Install one package, pick a style pack, and ship beautiful UI instantly.
        </p>
        <div style={{ display: "flex", gap: "var(--z-space-3, 0.75rem)" }}>
          {[
            { icon: "\u26A1", label: "Zero config" },
            { icon: "\uD83C\uDFA8", label: "6 style packs" },
            { icon: "\uD83E\uDD16", label: "AI-native" }
          ].map((item) => (
            <div
              key={item.label}
              style={{
                flex: 1,
                padding: "var(--z-space-3, 0.75rem)",
                borderRadius: "var(--z-radius-md, 0.5rem)",
                background: "color-mix(in srgb, var(--z-color-primary, #121212) 4%, transparent)",
                textAlign: "center",
                fontSize: "0.78rem",
                color: "var(--z-color-text, #171717)"
              }}
            >
              <div style={{ fontSize: "1.25rem", marginBottom: "4px" }}>{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "install",
    title: "Install the package",
    subtitle: "One command. Zero config.",
    nextLabel: "Done, next",
    content: (
      <code
        style={{
          display: "block",
          padding: "1rem 1.25rem",
          background: "color-mix(in srgb, var(--z-color-primary, #121212) 5%, var(--z-color-background, #f7f7f7))",
          borderRadius: "var(--z-radius-md, 0.5rem)",
          fontFamily: "var(--z-type-family-mono, monospace)",
          fontSize: "0.875rem",
          color: "var(--z-color-text,#171717)",
          border: "1px solid var(--z-color-border, #e5e5e5)",
          lineHeight: 1.8
        }}
      >
        <span style={{ color: "var(--z-color-muted, #5c5c5c)" }}>$</span>{" "}
        <span style={{ color: "var(--z-color-primary, #121212)" }}>pnpm</span> add @zephyr/ui-react
      </code>
    )
  },
  {
    id: "theme",
    title: "Pick your style pack",
    subtitle: "You can change this anytime.",
    nextLabel: "Finish setup",
    content: (
      <Stack direction="vertical" gap={2}>
        {([
          { name: "Studio", color: "#f97316", bg: "#f7f8fb" },
          { name: "Editorial", color: "#1d4ed8", bg: "#f8f5f1" },
          { name: "NeoBrutal", color: "#ff2955", bg: "#fff6d5" },
          { name: "SoftTech", color: "#3b82f6", bg: "#f4f7ff" }
        ]).map((pack) => (
          <Box
            key={pack.name}
            padding={3}
            radius="md"
            border
            style={{
              background: "var(--z-color-surface,#fff)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "var(--z-space-3, 0.75rem)"
            } as CSSProperties}
          >
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--z-radius-sm, 0.25rem)",
              background: pack.bg,
              border: "1px solid var(--z-color-border, #e5e5e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: pack.color }} />
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--z-color-text,#171717)" }}>{pack.name}</span>
          </Box>
        ))}
      </Stack>
    )
  }
];

export function OnboardingPage({
  steps = DEFAULT_STEPS,
  brand,
  onComplete,
  className,
  style
}: OnboardingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = steps[currentIndex];
  const isLast = currentIndex === steps.length - 1;

  function handleNext() {
    if (isLast) {
      onComplete?.();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleBack() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div
      className={className}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        background: "var(--z-color-background, #f7f7f7)",
        ...style
      }}
    >
      {/* ---- Left decorative panel ---- */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(2rem, 4vw, 3rem)",
          background: "linear-gradient(160deg, color-mix(in srgb, var(--z-color-primary, #121212) 6%, var(--z-color-background, #f7f7f7)) 0%, color-mix(in srgb, var(--z-color-accent, #fa7319) 4%, var(--z-color-background, #f7f7f7)) 100%)",
          overflow: "hidden"
        }}
      >
        {/* Dot pattern */}
        <svg aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.2, pointerEvents: "none" }}>
          <defs>
            <pattern id="onboard-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="var(--z-color-border, #e5e5e5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#onboard-dots)" />
        </svg>

        {/* Step illustration */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {stepIllustrations[current?.id ?? ""] ?? stepIllustrations.welcome}
        </div>
      </div>

      {/* ---- Right wizard panel ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--z-space-6, 1.5rem)"
        }}
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
          <Stack direction="vertical" gap={8}>
            {/* Brand */}
            {brand ? <div>{brand}</div> : null}

            {/* Step indicator */}
            <StepIndicator total={steps.length} current={currentIndex} />

            {/* Step content */}
            <Stack direction="vertical" gap={4}>
              <Stack direction="vertical" gap={1}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--z-color-text,#171717)"
                  }}
                >
                  {current?.title}
                </h2>
                {current?.subtitle ? (
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--z-color-muted,#5c5c5c)" }}>
                    {current.subtitle}
                  </p>
                ) : null}
              </Stack>
              {current?.content}
            </Stack>

            {/* Navigation buttons */}
            <Stack direction="horizontal" gap={3} justify="space-between" align="center">
              <div>
                {currentIndex > 0 ? (
                  <Button variant="ghost" onClick={handleBack}>
                    Back
                  </Button>
                ) : null}
              </div>
              <Button onClick={handleNext}>
                {current?.nextLabel ?? (isLast ? "Finish" : "Next")}
              </Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}
