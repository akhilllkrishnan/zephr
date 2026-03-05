import { CSSProperties } from "react";

export type ProgressTone = "primary" | "success" | "danger" | "warning" | "neutral";
export type ProgressVariant = "line" | "line-label" | "circle";
export type ProgressLineSize = "sm" | "md" | "lg";
export type ProgressCircleSize = 48 | 56 | 64 | 72 | 80;
export type ProgressLabelPlacement = "top" | "right";

export interface ProgressProps {
  /** 0–100. Omit or pass undefined for indeterminate (line variant only). */
  value?: number;
  /** Accessible label for progressbar semantics. */
  label?: string;
  /** Progress visual treatment. */
  variant?: ProgressVariant;
  /** Line track height for line and line-label variants. */
  size?: ProgressLineSize;
  /** Circular diameter for circle variant. */
  circleSize?: ProgressCircleSize;
  /** Color tone. */
  tone?: ProgressTone;
  /** Show percentage text. */
  showValue?: boolean;
  /** Label block title for line-label. */
  title?: string;
  /** Optional helper description (line-label). */
  description?: string;
  /** Link-like action label (line-label). */
  actionLabel?: string;
  /** Called when action link is clicked (line-label). */
  onAction?: () => void;
  /** Title/value placement for line-label. */
  labelPlacement?: ProgressLabelPlacement;
  /** Disable interactions like action links. */
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const LINE_SIZE_MAP: Record<ProgressLineSize, number> = {
  sm: 4,
  md: 6,
  lg: 8
};

const CIRCLE_STROKE_MAP: Record<ProgressCircleSize, number> = {
  48: 4,
  56: 4,
  64: 4,
  72: 4,
  80: 4
};

const TONE_COLOR_MAP: Record<ProgressTone, string> = {
  primary: "var(--z-color-primary, #335cff)",
  success: "var(--z-color-success, #1fc16b)",
  danger: "var(--z-color-danger, #ef4444)",
  warning: "var(--z-color-warning, #f59e0b)",
  neutral: "var(--z-color-muted, #8b8b8b)"
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

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function circleTypography(size: ProgressCircleSize): Pick<CSSProperties, "fontSize" | "lineHeight"> {
  if (size <= 56) {
    return {
      fontSize: "12px",
      lineHeight: "16px"
    };
  }
  return {
    fontSize: "14px",
    lineHeight: "20px"
  };
}

function ProgressLine({
  clamped,
  indeterminate,
  height,
  tone,
  label
}: {
  clamped: number;
  indeterminate: boolean;
  height: number;
  tone: ProgressTone;
  label: string;
}) {
  const color = TONE_COLOR_MAP[tone];

  if (indeterminate && typeof document !== "undefined") {
    ensureKeyframes();
  }

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
      style={{
        width: "100%",
        height,
        borderRadius: 999,
        background: "var(--z-color-background200, #ebebeb)",
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
          borderRadius: 999,
          transition: indeterminate ? undefined : "width 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          animation: indeterminate
            ? "z-progress-indeterminate 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            : undefined
        }}
      />
    </div>
  );
}

function ProgressCircle({
  clamped,
  size,
  tone,
  label,
  showValue
}: {
  clamped: number;
  size: ProgressCircleSize;
  tone: ProgressTone;
  label: string;
  showValue: boolean;
}) {
  const strokeWidth = CIRCLE_STROKE_MAP[size];
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const textStyles = circleTypography(size);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--z-color-background200, #ebebeb)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={TONE_COLOR_MAP[tone]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 220ms ease" }}
        />
      </svg>
      {showValue ? (
        <span
          aria-hidden
          style={{
            position: "absolute",
            color: "var(--z-color-text, #171717)",
            fontWeight: 500,
            letterSpacing: "-0.006em",
            fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0",
            ...textStyles
          }}
        >
          {Math.round(clamped)}%
        </span>
      ) : null}
    </div>
  );
}

export function Progress({
  value,
  label = "Loading",
  variant = "line",
  size = "md",
  circleSize = 64,
  tone = "primary",
  showValue = false,
  title = "Data Storage",
  description,
  actionLabel,
  onAction,
  labelPlacement = "top",
  disabled = false,
  className,
  style
}: ProgressProps) {
  const indeterminate = value === undefined || value === null;
  const clamped = indeterminate ? 0 : clamp(value);
  const lineHeight = LINE_SIZE_MAP[size];
  const hasDescription = Boolean(description);
  const isRightLayout = labelPlacement === "right";

  if (variant === "circle") {
    return (
      <div className={className} style={{ display: "inline-flex", ...style }}>
        <ProgressCircle
          clamped={clamped}
          size={circleSize}
          tone={tone}
          label={label}
          showValue={showValue}
        />
      </div>
    );
  }

  if (variant === "line-label") {
    const barNode = (
      <ProgressLine
        clamped={clamped}
        indeterminate={indeterminate}
        height={lineHeight}
        tone={tone}
        label={label}
      />
    );

    return (
      <div
        className={className}
        style={{
          width: "320px",
          display: "grid",
          gap: hasDescription || !isRightLayout ? "6px" : "8px",
          ...style
        }}
      >
        {isRightLayout ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
            <div style={{ flex: 1, minWidth: 0 }}>{barNode}</div>
            {showValue && !indeterminate ? (
              <span
                style={{
                  color: "var(--z-color-muted, #5c5c5c)",
                  fontSize: "12px",
                  lineHeight: "16px",
                  whiteSpace: "nowrap",
                  fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                }}
              >
                {clamped}%
              </span>
            ) : null}
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", width: "100%" }}>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  color: "var(--z-color-text, #171717)",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 500,
                  letterSpacing: "-0.006em",
                  fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                }}
              >
                {title}
              </span>
              {showValue && !indeterminate ? (
                <span
                  style={{
                    color: "var(--z-color-muted, #5c5c5c)",
                    fontSize: "12px",
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                    fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                  }}
                >
                  {clamped}%
                </span>
              ) : null}
            </div>
            {barNode}
          </>
        )}

        {hasDescription ? (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", width: "100%" }}>
            {actionLabel ? (
              <button
                type="button"
                disabled={disabled}
                onClick={onAction}
                style={{
                  border: 0,
                  background: "transparent",
                  color: "var(--z-color-primary, #335cff)",
                  textDecoration: "underline",
                  textDecorationSkipInk: "none",
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontWeight: 500,
                  padding: 0,
                  cursor: disabled ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  opacity: disabled ? 0.6 : 1,
                  fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
                }}
              >
                {actionLabel}
              </button>
            ) : null}
            <span
              style={{
                color: "var(--z-color-muted, #5c5c5c)",
                fontSize: "12px",
                lineHeight: "16px",
                fontFeatureSettings: "'ss11' 1, 'calt' 0, 'liga' 0"
              }}
            >
              {description}
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--z-space-2, 0.5rem)",
        width: "100%",
        ...style
      }}
    >
      <ProgressLine
        clamped={clamped}
        indeterminate={indeterminate}
        height={lineHeight}
        tone={tone}
        label={label}
      />
      {showValue && !indeterminate ? (
        <span
          aria-hidden
          style={{
            fontSize: "12px",
            lineHeight: "16px",
            color: "var(--z-color-muted, #5c5c5c)",
            fontVariantNumeric: "tabular-nums",
            minWidth: "3ch",
            textAlign: "right"
          }}
        >
          {clamped}%
        </span>
      ) : null}
    </div>
  );
}
