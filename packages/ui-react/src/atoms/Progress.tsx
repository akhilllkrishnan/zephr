import { CSSProperties } from "react";

export interface ProgressProps {
    /** 0–100. Omit or pass undefined for indeterminate. */
    value?: number;
    /** Accessible label */
    label?: string;
    /** Bar height */
    size?: "sm" | "md" | "lg";
    /** Color tone (uses primary by default) */
    tone?: "primary" | "success" | "danger" | "warning";
    /** Show percentage text next to bar */
    showValue?: boolean;
    className?: string;
    style?: CSSProperties;
}

const sizeMap: Record<NonNullable<ProgressProps["size"]>, number> = {
    sm: 4,
    md: 8,
    lg: 12
};

const toneColorMap: Record<NonNullable<ProgressProps["tone"]>, string> = {
    primary: "var(--z-color-primary, #335cff)",
    success: "var(--z-color-success, #1fc16b)",
    danger: "var(--z-color-danger, #ef4444)",
    warning: "var(--z-color-warning, #f59e0b)"
};

const indeterminateKeyframes = `
@keyframes z-progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
`;

let keyframesInjected = false;
function ensureKeyframes() {
    if (typeof document === "undefined" || keyframesInjected) return;
    const style = document.createElement("style");
    style.textContent = indeterminateKeyframes;
    document.head.appendChild(style);
    keyframesInjected = true;
}

export function Progress({
    value,
    label = "Loading",
    size = "md",
    tone = "primary",
    showValue = false,
    className,
    style
}: ProgressProps) {
    const indeterminate = value === undefined || value === null;
    const clamped = indeterminate ? 0 : Math.min(100, Math.max(0, value));
    const height = sizeMap[size];
    const color = toneColorMap[tone];

    if (!indeterminate && typeof document !== "undefined") {
        ensureKeyframes();
    }

    return (
        <div
            className={className}
            style={{ display: "flex", alignItems: "center", gap: "var(--z-space-3, 0.75rem)", ...style }}
        >
            <div
                role="progressbar"
                aria-label={label}
                aria-valuenow={indeterminate ? undefined : clamped}
                aria-valuemin={indeterminate ? undefined : 0}
                aria-valuemax={indeterminate ? undefined : 100}
                style={{
                    flex: 1,
                    height,
                    borderRadius: 9999,
                    background: "var(--z-color-weak, #f0f0f0)",
                    overflow: "hidden",
                    position: "relative"
                }}
            >
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: indeterminate ? "35%" : `${clamped}%`,
                        background: color,
                        borderRadius: 9999,
                        transition: indeterminate ? undefined : "width 320ms cubic-bezier(0.4, 0, 0.2, 1)",
                        animation: indeterminate
                            ? "z-progress-indeterminate 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                            : undefined
                    }}
                />
            </div>
            {showValue && !indeterminate && (
                <span
                    aria-hidden
                    style={{
                        fontSize: "var(--z-type-size-sm, 0.875rem)",
                        color: "var(--z-color-muted, #737373)",
                        fontVariantNumeric: "tabular-nums",
                        minWidth: "3ch",
                        textAlign: "right"
                    }}
                >
                    {clamped}%
                </span>
            )}
        </div>
    );
}
