import { CSSProperties } from "react";

export interface SkeletonProps {
    /** Width of the skeleton block (CSS value string or number px) */
    width?: string | number;
    /** Height of the skeleton block (CSS value string or number px) */
    height?: string | number;
    /** Border-radius preset or raw CSS value */
    radius?: "none" | "sm" | "md" | "lg" | "full" | string;
    /** Stack multiple lines (replaces width/height with lines config) */
    lines?: number;
    /** Gap between lines (when `lines` > 1) */
    lineGap?: string;
    className?: string;
    style?: CSSProperties;
}

const radiusMap: Record<string, string> = {
    none: "0",
    sm: "var(--z-radius-sm, 4px)",
    md: "var(--z-radius-md, 8px)",
    lg: "var(--z-radius-lg, 12px)",
    full: "9999px"
};

const shimmerKeyframes = `
@keyframes z-skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

let keyframesInjected = false;
function ensureKeyframes() {
    if (typeof document === "undefined" || keyframesInjected) return;
    const style = document.createElement("style");
    style.textContent = shimmerKeyframes;
    document.head.appendChild(style);
    keyframesInjected = true;
}

function SkeletonBlock({ width, height, radius }: { width?: string | number; height?: string | number; radius?: string }) {
    if (typeof document !== "undefined") ensureKeyframes();

    const resolvedRadius = radius
        ? radiusMap[radius] ?? radius
        : "var(--z-radius-sm, 4px)";

    const w = typeof width === "number" ? `${width}px` : width ?? "100%";
    const h = typeof height === "number" ? `${height}px` : height ?? "1.25em";

    return (
        <span
            aria-hidden="true"
            style={{
                display: "block",
                width: w,
                height: h,
                borderRadius: resolvedRadius,
                background:
                    "linear-gradient(90deg, var(--z-color-weak, #f0f0f0) 25%, var(--z-color-border, #e5e5e5) 37%, var(--z-color-weak, #f0f0f0) 63%)",
                backgroundSize: "400% 100%",
                animation: "z-skeleton-shimmer 1.4s ease infinite"
            }}
        />
    );
}

export function Skeleton({
    width,
    height,
    radius,
    lines,
    lineGap = "0.5rem",
    className,
    style
}: SkeletonProps) {
    if (lines && lines > 1) {
        return (
            <div
                className={className}
                style={{ display: "flex", flexDirection: "column", gap: lineGap, ...style }}
                aria-busy="true"
                aria-label="Loading"
            >
                {Array.from({ length: lines }).map((_, i) => (
                    <SkeletonBlock
                        key={i}
                        // Last line shorter to simulate natural text wrapping
                        width={i === lines - 1 ? "65%" : "100%"}
                        height={height}
                        radius={radius}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={className}
            style={style}
            aria-busy="true"
            aria-label="Loading"
        >
            <SkeletonBlock width={width} height={height} radius={radius} />
        </div>
    );
}
