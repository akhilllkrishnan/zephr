import { CSSProperties, ReactNode } from "react";

export interface FeatureItem {
    id: string;
    icon?: ReactNode;
    title: string;
    description: string;
}

export interface FeatureGridProps {
    headline?: string;
    subheadline?: string;
    features: FeatureItem[];
    /** Number of columns in the grid */
    columns?: 2 | 3 | 4;
    /** Icon size treatment */
    iconStyle?: "plain" | "boxed" | "circle";
    className?: string;
    style?: CSSProperties;
}

const iconContainerStyles: Record<NonNullable<FeatureGridProps["iconStyle"]>, CSSProperties> = {
    plain: { display: "inline-flex" },
    boxed: {
        display: "inline-flex",
        padding: "var(--z-space-2, 0.5rem)",
        borderRadius: "var(--z-radius-md, 8px)",
        background: "var(--z-color-primary, #335cff)12",
        color: "var(--z-color-primary, #335cff)"
    },
    circle: {
        display: "inline-flex",
        padding: "var(--z-space-3, 0.75rem)",
        borderRadius: "50%",
        background: "var(--z-color-primary, #335cff)12",
        color: "var(--z-color-primary, #335cff)"
    }
};

export function FeatureGrid({
    headline,
    subheadline,
    features,
    columns = 3,
    iconStyle = "boxed",
    className,
    style
}: FeatureGridProps) {
    return (
        <section
            className={className}
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--z-space-10, 2.5rem)",
                background: "var(--z-color-surface, #ffffff)",
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
                        <p
                            style={{
                                margin: 0,
                                fontSize: "var(--z-type-size-lg, 1.125rem)",
                                color: "var(--z-color-muted, #737373)",
                                lineHeight: 1.6
                            }}
                        >
                            {subheadline}
                        </p>
                    )}
                </div>
            )}

            <ul
                style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    gap: "var(--z-space-7, 1.75rem)"
                }}
            >
                {features.map((f) => (
                    <li key={f.id}>
                        <article
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--z-space-3, 0.75rem)"
                            }}
                        >
                            {f.icon && (
                                <span style={iconContainerStyles[iconStyle]} aria-hidden>
                                    {f.icon}
                                </span>
                            )}
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "var(--z-type-size-base, 1rem)",
                                    fontWeight: "var(--z-type-weight-semibold, 600)" as CSSProperties["fontWeight"],
                                    color: "var(--z-color-text, #171717)"
                                }}
                            >
                                {f.title}
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "var(--z-type-size-sm, 0.875rem)",
                                    color: "var(--z-color-muted, #737373)",
                                    lineHeight: 1.6
                                }}
                            >
                                {f.description}
                            </p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}
