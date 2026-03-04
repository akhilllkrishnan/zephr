import { CSSProperties, ReactNode } from "react";

export interface PricingTier {
    id: string;
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    cta: ReactNode;
    highlighted?: boolean;
    badge?: string;
}

export interface PricingTableProps {
    headline?: string;
    subheadline?: string;
    tiers: PricingTier[];
    className?: string;
    style?: CSSProperties;
}

export function PricingTable({
    headline,
    subheadline,
    tiers,
    className,
    style
}: PricingTableProps) {
    return (
        <section
            className={className}
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                background: "var(--z-color-weak, #f7f7f7)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--z-space-10, 2.5rem)",
                ...style
            }}
        >
            {(headline || subheadline) && (
                <div style={{ textAlign: "center", maxWidth: "48ch" }}>
                    {headline && (
                        <h2
                            style={{
                                margin: "0 0 var(--z-space-3, 0.75rem)",
                                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                                fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"],
                                color: "var(--z-color-text, #171717)",
                                lineHeight: 1.25,
                                letterSpacing: "-0.015em"
                            }}
                        >
                            {headline}
                        </h2>
                    )}
                    {subheadline && (
                        <p style={{ margin: 0, fontSize: "var(--z-type-size-lg, 1.125rem)", color: "var(--z-color-muted, #737373)" }}>
                            {subheadline}
                        </p>
                    )}
                </div>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 340px))`,
                    gap: "var(--z-space-5, 1.25rem)",
                    alignItems: "start",
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        style={{
                            position: "relative",
                            background: "var(--z-color-surface, #ffffff)",
                            border: tier.highlighted
                                ? `2px solid var(--z-color-primary, #335cff)`
                                : "1px solid var(--z-color-border, #ebebeb)",
                            borderRadius: "var(--z-radius-lg, 14px)",
                            padding: "var(--z-space-7, 1.75rem)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--z-space-4, 1rem)",
                            boxShadow: tier.highlighted
                                ? "0 8px 32px rgba(51,92,255,0.12)"
                                : "var(--z-shadow-sm, 0 1px 3px rgba(14,18,27,0.08))"
                        }}
                    >
                        {tier.badge && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: -12,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "var(--z-color-primary, #335cff)",
                                    color: "#fff",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: "2px 10px",
                                    borderRadius: 99,
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase"
                                }}
                            >
                                {tier.badge}
                            </span>
                        )}

                        <div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--z-color-muted, #737373)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                {tier.name}
                            </p>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: "var(--z-space-2, 0.5rem)" }}>
                                <span style={{ fontSize: "2.25rem", fontWeight: 700, color: "var(--z-color-text, #171717)", letterSpacing: "-0.03em" }}>
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span style={{ fontSize: 14, color: "var(--z-color-muted, #737373)" }}>
                                        {tier.period}
                                    </span>
                                )}
                            </div>
                            {tier.description && (
                                <p style={{ margin: "var(--z-space-2, 0.5rem) 0 0", fontSize: 14, color: "var(--z-color-muted, #737373)", lineHeight: 1.5 }}>
                                    {tier.description}
                                </p>
                            )}
                        </div>

                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--z-space-2, 0.5rem)" }}>
                            {tier.features.map((feat, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--z-space-2, 0.5rem)", fontSize: 14, color: "var(--z-color-text, #171717)" }}>
                                    <span aria-hidden style={{ color: "var(--z-color-success, #1fc16b)", flexShrink: 0, fontSize: 16 }}>✓</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: "auto" }}>
                            {tier.cta}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
