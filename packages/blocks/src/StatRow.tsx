import { CSSProperties, ReactNode } from "react";

export interface StatItem {
    id: string;
    value: string;
    label: string;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
}

export interface StatRowProps {
    stats: StatItem[];
    /** Optional divider between stats */
    divided?: boolean;
    className?: string;
    style?: CSSProperties;
}

const trendColors: Record<NonNullable<StatItem["trendDirection"]>, CSSProperties["color"]> = {
    up: "var(--z-color-success, #1fc16b)",
    down: "var(--z-color-danger, #ef4444)",
    neutral: "var(--z-color-muted, #737373)"
};

export function StatRow({
    stats,
    divided = true,
    className,
    style
}: StatRowProps) {
    return (
        <dl
            className={className}
            style={{
                display: "flex",
                flexWrap: "wrap",
                margin: 0,
                padding: "var(--z-space-7, 1.75rem)",
                background: "var(--z-color-surface, #ffffff)",
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "var(--z-radius-lg, 12px)",
                ...style
            }}
        >
            {stats.map((s, i) => (
                <div
                    key={s.id}
                    style={{
                        flex: 1,
                        minWidth: 120,
                        padding: "var(--z-space-4, 1rem) var(--z-space-5, 1.25rem)",
                        borderLeft:
                            divided && i > 0
                                ? "1px solid var(--z-color-border, #ebebeb)"
                                : undefined,
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--z-space-1, 0.25rem)"
                    }}
                >
                    <dd
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                            fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"],
                            color: "var(--z-color-text, #171717)",
                            letterSpacing: "-0.02em",
                            fontVariantNumeric: "tabular-nums"
                        }}
                    >
                        {s.value}
                        {s.trend && (
                            <span
                                style={{
                                    marginLeft: "var(--z-space-2, 0.5rem)",
                                    fontSize: "var(--z-type-size-sm, 0.875rem)",
                                    fontWeight: 500,
                                    color: trendColors[s.trendDirection ?? "neutral"]
                                }}
                            >
                                {s.trend}
                            </span>
                        )}
                    </dd>
                    <dt
                        style={{
                            margin: 0,
                            fontSize: "var(--z-type-size-sm, 0.875rem)",
                            color: "var(--z-color-muted, #737373)"
                        }}
                    >
                        {s.label}
                    </dt>
                </div>
            ))}
        </dl>
    );
}

// ---- StatCard (single KPI card) ----

export interface StatCardProps {
    value: string;
    label: string;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    description?: string;
    icon?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export function StatCard({
    value,
    label,
    trend,
    trendDirection = "neutral",
    description,
    icon,
    className,
    style
}: StatCardProps) {
    return (
        <div
            className={className}
            style={{
                padding: "var(--z-space-5, 1.25rem)",
                background: "var(--z-color-surface, #ffffff)",
                border: "1px solid var(--z-color-border, #ebebeb)",
                borderRadius: "var(--z-radius-lg, 12px)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--z-space-3, 0.75rem)",
                ...style
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <dl style={{ margin: 0 }}>
                    <dt style={{ margin: 0, fontSize: "var(--z-type-size-sm, 0.875rem)", color: "var(--z-color-muted, #737373)" }}>
                        {label}
                    </dt>
                    <dd style={{ margin: "var(--z-space-1, 0.25rem) 0 0", fontSize: "2rem", fontWeight: 700, color: "var(--z-color-text, #171717)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        {value}
                    </dd>
                </dl>
                {icon && <span aria-hidden style={{ color: "var(--z-color-muted, #737373)", fontSize: 20 }}>{icon}</span>}
            </div>
            {(trend || description) && (
                <p style={{ margin: 0, fontSize: "var(--z-type-size-xs, 0.75rem)", color: "var(--z-color-muted, #737373)" }}>
                    {trend && (
                        <span style={{ fontWeight: 600, color: trendColors[trendDirection], marginRight: 4 }}>
                            {trend}
                        </span>
                    )}
                    {description}
                </p>
            )}
        </div>
    );
}
