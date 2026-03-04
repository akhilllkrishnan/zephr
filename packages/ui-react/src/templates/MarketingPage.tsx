import { CSSProperties, ReactNode } from "react";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { Stack } from "../layout/Stack";
import { Grid } from "../layout/Grid";
import { Box } from "../layout/Box";

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

/* ---------- Inline SVG icons for default features ---------- */

const IconBolt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const IconCpu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

const IconPalette = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2" />
    <circle cx="17.5" cy="10.5" r="2" />
    <circle cx="8.5" cy="7.5" r="2" />
    <circle cx="6.5" cy="12.5" r="2" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H16c3.3 0 6-2.7 6-6 0-5.2-4.5-8.5-10-8.5z" />
  </svg>
);

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconGift = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 010-5A4.8 4.8 0 0112 8a4.8 4.8 0 014.5-5 2.5 2.5 0 010 5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--z-color-success, #059669)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const defaultIcons: Record<string, ReactNode> = {
  f1: <IconBolt />,
  f2: <IconCpu />,
  f3: <IconPalette />,
  f4: <IconShield />,
  f5: <IconCode />,
  f6: <IconGift />
};

const defaultFeatures: MarketingFeature[] = [
  { id: "f1", title: "Lightning Fast", description: "Zero-config setup. One install command and you're building production UIs.", icon: <IconBolt /> },
  { id: "f2", title: "AI-Native", description: "Components designed to be discovered and composed by AI coding assistants.", icon: <IconCpu /> },
  { id: "f3", title: "Themeable", description: "Six style packs with dark mode. Change your entire look in one line.", icon: <IconPalette /> },
  { id: "f4", title: "Accessible", description: "WCAG-compliant components with semantic HTML and keyboard support.", icon: <IconShield /> },
  { id: "f5", title: "No Utility Classes", description: "Components self-style via CSS variables. No framework dependency.", icon: <IconCode /> },
  { id: "f6", title: "Free Tier", description: "Build complete apps with 20+ free components. No account required.", icon: <IconGift /> }
];

const defaultPlans: MarketingPricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Everything you need to start building.",
    features: ["Studio style pack", "20+ atoms & layout primitives", "Dark mode", "CLI & MCP tools", "No account required"],
    ctaLabel: "Get Started"
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Full creative control for serious builders.",
    features: ["5 premium style packs", "17 Pro molecules & organisms", "Page templates", "Per-tool AI prompts", "Priority support"],
    ctaLabel: "Upgrade to Pro",
    highlighted: true
  },
  {
    id: "team",
    name: "Team",
    price: "$149",
    period: "/month",
    description: "Scale across your entire organization.",
    features: ["Everything in Pro", "Unlimited seats", "Cloud API access", "Custom style packs", "Dedicated onboarding"],
    ctaLabel: "Contact Sales"
  }
];

const defaultLogos: MarketingLogo[] = [
  { name: "Vercel" },
  { name: "Supabase" },
  { name: "Stripe" },
  { name: "Linear" },
  { name: "Notion" }
];

const defaultTestimonials: MarketingTestimonial[] = [
  {
    id: "t1",
    quote: "Zephyr cut our component development time in half. The AI prompts are genuinely useful — not a gimmick.",
    name: "Sarah Chen",
    title: "Staff Engineer, Vercel",
    avatarColor: "var(--z-color-primary, #121212)"
  },
  {
    id: "t2",
    quote: "We switched from shadcn and haven't looked back. The style packs make every project feel unique without extra work.",
    name: "Marcus Rodriguez",
    title: "Design Lead, Linear",
    avatarColor: "var(--z-color-accent, #fa7319)"
  },
  {
    id: "t3",
    quote: "Finally, a component library that AI tools can actually understand. Our team ships features 3x faster now.",
    name: "Priya Patel",
    title: "CTO, Acme Labs",
    avatarColor: "var(--z-color-success, #059669)"
  }
];

const defaultStats = [
  { value: "30+", label: "Components" },
  { value: "6", label: "Style Packs" },
  { value: "0", label: "Config Required" },
  { value: "AI", label: "Native" }
];

export function MarketingPage({
  brand,
  heroTitle = "Build beautiful UIs — instantly.",
  heroSubtitle = "A complete, AI-native component system. One install. Six style packs. Zero config.",
  heroBadge = "Now in Beta",
  features = defaultFeatures,
  pricingPlans = defaultPlans,
  logos = defaultLogos,
  testimonials = defaultTestimonials,
  ctaLabel = "Get Started Free",
  secondaryCtaLabel = "View Documentation",
  onCtaClick,
  onSecondaryCtaClick,
  className,
  style
}: MarketingPageProps) {
  const sectionPadding: CSSProperties = {
    padding: "var(--z-space-12, 3rem) var(--z-space-6, 1.5rem)",
    maxWidth: "1120px",
    margin: "0 auto"
  };

  return (
    <div className={className} style={{ background: "var(--z-color-background, #fafafa)", ...style }}>
      {/* ---- Hero ---- */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(160deg, var(--z-color-background, #fafafa) 0%, color-mix(in srgb, var(--z-color-primary, #121212) 6%, var(--z-color-background, #fafafa)) 50%, color-mix(in srgb, var(--z-color-accent, #fa7319) 4%, var(--z-color-background, #fafafa)) 100%)",
          paddingTop: "clamp(3rem, 8vw, 5rem)",
          paddingBottom: "clamp(3rem, 8vw, 5rem)"
        }}
      >
        {/* Decorative dot grid */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.3, pointerEvents: "none" }}
        >
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="var(--z-color-border, #e5e5e5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>

        <div style={{ ...sectionPadding, position: "relative", textAlign: "center", padding: "0 var(--z-space-6, 1.5rem)" }}>
          {brand ? <div style={{ marginBottom: "var(--z-space-4, 1rem)" }}>{brand}</div> : null}

          {heroBadge ? (
            <div style={{ marginBottom: "var(--z-space-4, 1rem)" }}>
              <Badge tone="info">{heroBadge}</Badge>
            </div>
          ) : null}

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)",
              fontWeight: "var(--z-type-weight-bold, 700)",
              color: "var(--z-color-text, #171717)",
              margin: "0 0 var(--z-space-4, 1rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {heroTitle}
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--z-color-muted, #5c5c5c)",
              margin: "0 auto var(--z-space-8, 2rem)",
              maxWidth: "600px",
              lineHeight: 1.6
            }}
          >
            {heroSubtitle}
          </p>
          <Stack direction="horizontal" gap={3} justify="center" align="center" wrap>
            <Button onClick={onCtaClick}>{ctaLabel}</Button>
            <Button variant="secondary" onClick={onSecondaryCtaClick}>{secondaryCtaLabel}</Button>
          </Stack>
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section style={{ ...sectionPadding, paddingTop: "var(--z-space-10, 2.5rem)", paddingBottom: "var(--z-space-10, 2.5rem)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            flexWrap: "wrap"
          }}
        >
          {defaultStats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "0 clamp(1rem, 3vw, 2.5rem)",
                borderRight: i < defaultStats.length - 1 ? "1px solid var(--z-color-border, #e5e5e5)" : "none"
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: "var(--z-type-weight-bold, 700)",
                  color: "var(--z-color-text, #171717)",
                  lineHeight: 1.1
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "var(--z-type-size-sm, 0.875rem)",
                  color: "var(--z-color-muted, #5c5c5c)",
                  marginTop: "var(--z-space-1, 0.25rem)"
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Features ---- */}
      {features.length > 0 ? (
        <section style={sectionPadding}>
          <div style={{ textAlign: "center", marginBottom: "var(--z-space-10, 2.5rem)" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: "var(--z-type-weight-bold, 700)",
                color: "var(--z-color-text, #171717)",
                margin: "0 0 var(--z-space-2, 0.5rem)",
                letterSpacing: "-0.02em"
              }}
            >
              Everything you need
            </h2>
            <p style={{ color: "var(--z-color-muted, #5c5c5c)", margin: 0, fontSize: "var(--z-type-size-lg, 1.125rem)" }}>
              Production-ready components with a workflow built for AI-assisted development.
            </p>
          </div>
          <Grid columns={3} gap={4}>
            {features.map((feature) => (
              <Box
                key={feature.id}
                padding={5}
                radius="lg"
                border
                style={{
                  background: "var(--z-color-surface, #ffffff)",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease"
                } as CSSProperties}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--z-radius-md, 0.5rem)",
                    background: "color-mix(in srgb, var(--z-color-primary, #121212) 8%, transparent)",
                    color: "var(--z-color-primary, #121212)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--z-space-3, 0.75rem)"
                  }}
                >
                  {feature.icon ?? defaultIcons[feature.id] ?? null}
                </div>
                <h3
                  style={{
                    fontSize: "var(--z-type-size-base, 1rem)",
                    fontWeight: "var(--z-type-weight-semibold, 600)",
                    color: "var(--z-color-text, #171717)",
                    margin: "0 0 var(--z-space-2, 0.5rem)"
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--z-type-size-sm, 0.875rem)",
                    color: "var(--z-color-muted, #5c5c5c)",
                    margin: 0,
                    lineHeight: 1.6
                  }}
                >
                  {feature.description}
                </p>
              </Box>
            ))}
          </Grid>
        </section>
      ) : null}

      {/* ---- Social proof logos ---- */}
      {logos.length > 0 ? (
        <section style={{ ...sectionPadding, textAlign: "center" }}>
          <p
            style={{
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              fontWeight: "var(--z-type-weight-semibold, 600)",
              color: "var(--z-color-muted, #5c5c5c)",
              marginBottom: "var(--z-space-6, 1.5rem)",
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}
          >
            Trusted by 500+ developers
          </p>
          <Stack direction="horizontal" gap={8} justify="center" align="center" wrap>
            {logos.map((logo, i) => (
              <span
                key={logo.name}
                style={{
                  fontSize: "1.15rem",
                  fontWeight: "var(--z-type-weight-bold, 700)",
                  color: "var(--z-color-text, #171717)",
                  opacity: 0.35 + (i % 3) * 0.1,
                  letterSpacing: "-0.01em"
                }}
              >
                {logo.name}
              </span>
            ))}
          </Stack>
        </section>
      ) : null}

      {/* ---- Testimonials ---- */}
      {testimonials.length > 0 ? (
        <section style={sectionPadding}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: "var(--z-type-weight-bold, 700)",
              color: "var(--z-color-text, #171717)",
              textAlign: "center",
              margin: "0 0 var(--z-space-8, 2rem)",
              letterSpacing: "-0.02em"
            }}
          >
            Loved by builders
          </h2>
          <Grid columns={3} gap={4}>
            {testimonials.map((t) => (
              <Box
                key={t.id}
                padding={5}
                radius="lg"
                border
                style={{ background: "var(--z-color-surface, #ffffff)" } as CSSProperties}
              >
                <Stack direction="vertical" gap={4}>
                  <p
                    style={{
                      fontSize: "var(--z-type-size-sm, 0.875rem)",
                      color: "var(--z-color-text, #171717)",
                      margin: 0,
                      lineHeight: 1.65,
                      fontStyle: "italic"
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <Stack direction="horizontal" gap={3} align="center">
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: t.avatarColor ?? "var(--z-color-primary, #121212)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: "var(--z-type-weight-semibold, 600)", fontSize: "var(--z-type-size-sm, 0.875rem)", color: "var(--z-color-text, #171717)" }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--z-color-muted, #5c5c5c)" }}>
                        {t.title}
                      </div>
                    </div>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Grid>
        </section>
      ) : null}

      {/* ---- Pricing ---- */}
      {pricingPlans.length > 0 ? (
        <section style={sectionPadding}>
          <div style={{ textAlign: "center", marginBottom: "var(--z-space-10, 2.5rem)" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: "var(--z-type-weight-bold, 700)",
                color: "var(--z-color-text, #171717)",
                margin: "0 0 var(--z-space-2, 0.5rem)",
                letterSpacing: "-0.02em"
              }}
            >
              Simple, transparent pricing
            </h2>
            <p style={{ color: "var(--z-color-muted, #5c5c5c)", margin: 0 }}>
              Start free. Upgrade when you&apos;re ready.
            </p>
          </div>
          <Grid columns={pricingPlans.length} gap={4}>
            {pricingPlans.map((plan) => (
              <Box
                key={plan.id}
                padding={6}
                radius="lg"
                border
                style={{
                  background: "var(--z-color-surface, #ffffff)",
                  borderTop: plan.highlighted ? "3px solid var(--z-color-primary, #121212)" : undefined,
                  position: "relative"
                } as CSSProperties}
              >
                {plan.highlighted ? (
                  <div style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}>
                    <Badge tone="info">Most Popular</Badge>
                  </div>
                ) : null}
                <Stack direction="vertical" gap={4}>
                  <div>
                    <h3
                      style={{
                        fontSize: "var(--z-type-size-lg, 1.125rem)",
                        fontWeight: "var(--z-type-weight-semibold, 600)",
                        color: "var(--z-color-text, #171717)",
                        margin: 0
                      }}
                    >
                      {plan.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginTop: "var(--z-space-3, 0.75rem)" }}>
                      <span
                        style={{
                          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                          fontWeight: "var(--z-type-weight-bold, 700)",
                          color: "var(--z-color-text, #171717)",
                          lineHeight: 1
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.period ? (
                        <span style={{ fontSize: "var(--z-type-size-sm, 0.875rem)", color: "var(--z-color-muted, #5c5c5c)" }}>
                          {plan.period}
                        </span>
                      ) : null}
                    </div>
                    <p
                      style={{
                        fontSize: "var(--z-type-size-sm, 0.875rem)",
                        color: "var(--z-color-muted, #5c5c5c)",
                        margin: "var(--z-space-2, 0.5rem) 0 0",
                        lineHeight: 1.5
                      }}
                    >
                      {plan.description}
                    </p>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--z-space-3, 0.75rem)"
                    }}
                  >
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          fontSize: "var(--z-type-size-sm, 0.875rem)",
                          color: "var(--z-color-text, #171717)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "var(--z-space-2, 0.5rem)"
                        }}
                      >
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? "primary" : "secondary"}
                    fullWidth
                    onClick={plan.onCtaClick}
                  >
                    {plan.ctaLabel}
                  </Button>
                </Stack>
              </Box>
            ))}
          </Grid>
        </section>
      ) : null}

      {/* ---- Bottom CTA ---- */}
      <section
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--z-color-primary, #121212) 5%, var(--z-color-background, #fafafa)) 0%, color-mix(in srgb, var(--z-color-accent, #fa7319) 6%, var(--z-color-background, #fafafa)) 100%)",
          marginTop: "var(--z-space-8, 2rem)"
        }}
      >
        <div style={{ ...sectionPadding, textAlign: "center", paddingTop: "clamp(2.5rem, 6vw, 4rem)", paddingBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: "var(--z-type-weight-bold, 700)",
              color: "var(--z-color-text, #171717)",
              margin: "0 0 var(--z-space-3, 0.75rem)",
              letterSpacing: "-0.02em"
            }}
          >
            Ready to build?
          </h2>
          <p
            style={{
              color: "var(--z-color-muted, #5c5c5c)",
              margin: "0 auto var(--z-space-6, 1.5rem)",
              maxWidth: "480px",
              lineHeight: 1.6
            }}
          >
            Install Zephyr and start shipping beautiful interfaces in minutes.
          </p>
          <Stack direction="vertical" gap={2} align="center">
            <Button onClick={onCtaClick}>{ctaLabel}</Button>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--z-color-muted, #5c5c5c)" }}>
              No credit card required
            </p>
          </Stack>
        </div>
      </section>
    </div>
  );
}
