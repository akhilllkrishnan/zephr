import { CSSProperties, ReactNode } from "react";

export interface HeroSectionProps {
    headline: ReactNode;
    subheadline?: ReactNode;
    primaryCta?: ReactNode;
    secondaryCta?: ReactNode;
    media?: ReactNode;
    /** Layout variant */
    layout?: "centered" | "splitLeft" | "splitRight";
    /** Background treatment */
    background?: "default" | "subtle" | "gradient";
    className?: string;
    style?: CSSProperties;
}

const bgStyles: Record<NonNullable<HeroSectionProps["background"]>, CSSProperties> = {
    default: { background: "var(--z-color-surface, #ffffff)" },
    subtle: { background: "var(--z-color-weak, #f7f7f7)" },
    gradient: {
        background:
            "linear-gradient(135deg, var(--z-color-primary, #335cff)12 0%, var(--z-color-surface, #ffffff) 60%)"
    }
};

export function HeroSection({
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
    media,
    layout = "centered",
    background = "default",
    className,
    style
}: HeroSectionProps) {
    const isCentered = layout === "centered";
    const isRight = layout === "splitRight";

    const textAlign: CSSProperties["textAlign"] = isCentered ? "center" : "left";
    const justifyContent = isCentered ? "center" : "flex-start";

    return (
        <section
            className={className}
            aria-labelledby="hero-headline"
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                display: "flex",
                flexDirection: isCentered ? "column" : "row",
                alignItems: "center",
                gap: "var(--z-space-10, 2.5rem)",
                flexWrap: "wrap",
                ...bgStyles[background],
                ...style
            }}
        >
            {/* Content side */}
            <div
                style={{
                    flex: 1,
                    minWidth: 280,
                    order: isRight ? 2 : 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isCentered ? "center" : "flex-start",
                    gap: "var(--z-space-5, 1.25rem)",
                    textAlign
                }}
            >
                <h1
                    id="hero-headline"
                    style={{
                        margin: 0,
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"],
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        color: "var(--z-color-text, #171717)"
                    }}
                >
                    {headline}
                </h1>
                {subheadline && (
                    <p
                        style={{
                            margin: 0,
                            fontSize: "clamp(1rem, 2vw, 1.25rem)",
                            color: "var(--z-color-muted, #737373)",
                            lineHeight: 1.6,
                            maxWidth: isCentered ? "52ch" : "45ch"
                        }}
                    >
                        {subheadline}
                    </p>
                )}
                {(primaryCta || secondaryCta) && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent,
                            flexWrap: "wrap",
                            gap: "var(--z-space-3, 0.75rem)"
                        }}
                    >
                        {primaryCta}
                        {secondaryCta}
                    </div>
                )}
            </div>

            {/* Media side */}
            {media && (
                <div
                    style={{
                        flex: 1,
                        minWidth: 280,
                        order: isRight ? 1 : 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {media}
                </div>
            )}
        </section>
    );
}
