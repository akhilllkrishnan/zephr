import { CSSProperties, ReactNode } from "react";

export interface CtaBannerProps {
    headline: string;
    description?: string;
    primaryCta?: ReactNode;
    secondaryCta?: ReactNode;
    /** Banner background style */
    variant?: "primary" | "dark" | "subtle";
    className?: string;
    style?: CSSProperties;
}

const variantStyles: Record<NonNullable<CtaBannerProps["variant"]>, CSSProperties> = {
    primary: {
        background: "var(--z-color-primary, #335cff)",
        color: "#ffffff"
    },
    dark: {
        background: "var(--z-color-text, #171717)",
        color: "#ffffff"
    },
    subtle: {
        background: "var(--z-color-weak, #f0f4ff)",
        color: "var(--z-color-text, #171717)"
    }
};

export function CtaBanner({
    headline,
    description,
    primaryCta,
    secondaryCta,
    variant = "primary",
    className,
    style
}: CtaBannerProps) {
    const colors = variantStyles[variant];
    const mutedColor = variant === "subtle"
        ? "var(--z-color-muted, #737373)"
        : "rgba(255,255,255,0.75)";

    return (
        <section
            className={className}
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--z-space-7, 1.75rem)",
                borderRadius: "var(--z-radius-xl, 16px)",
                ...colors,
                ...style
            }}
        >
            <div style={{ maxWidth: "52ch" }}>
                <h2
                    style={{
                        margin: 0,
                        fontSize: "clamp(1.25rem, 3vw, 2rem)",
                        fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"],
                        lineHeight: 1.25,
                        letterSpacing: "-0.015em",
                        color: "inherit"
                    }}
                >
                    {headline}
                </h2>
                {description && (
                    <p style={{ margin: "var(--z-space-3, 0.75rem) 0 0", fontSize: "var(--z-type-size-base, 1rem)", color: mutedColor, lineHeight: 1.6 }}>
                        {description}
                    </p>
                )}
            </div>
            {(primaryCta || secondaryCta) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--z-space-3, 0.75rem)", flexShrink: 0 }}>
                    {primaryCta}
                    {secondaryCta}
                </div>
            )}
        </section>
    );
}
