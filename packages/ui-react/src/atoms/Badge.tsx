import { CSSProperties, ReactNode } from "react";

export type BadgeTone = "neutral" | "info" | "success" | "danger" | "subtle";
export type BadgeVariant = "filled" | "lighter" | "stroke" | "white";
export type BadgeColor =
  | "gray"
  | "blue"
  | "orange"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "sky"
  | "pink"
  | "teal";
export type BadgeType = "basic" | "dot" | "left-icon" | "right-icon";

export interface BadgeProps {
  children?: ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  color?: BadgeColor;
  type?: BadgeType;
  size?: "sm" | "md";
  icon?: ReactNode;
  number?: boolean | number | string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface BadgePalette {
  filled: string;
  lighter: string;
  stroke: string;
  text: string;
  onFilled: string;
}

const colorPalettes: Record<BadgeColor, BadgePalette> = {
  gray: {
    filled: "var(--z-color-text700, #475467)",
    lighter: "var(--z-color-background200, #f2f4f7)",
    stroke: "var(--z-color-stroke300, #d0d5dd)",
    text: "var(--z-color-text700, #475467)",
    onFilled: "#ffffff"
  },
  blue: {
    filled: "var(--z-color-info, var(--z-color-primary, #335cff))",
    lighter: "#eef4ff",
    stroke: "#b9c8ff",
    text: "var(--z-color-info, var(--z-color-primary, #335cff))",
    onFilled: "#ffffff"
  },
  orange: {
    filled: "var(--z-color-warning, #f79009)",
    lighter: "#fff6e7",
    stroke: "#fecd8a",
    text: "#b54708",
    onFilled: "#ffffff"
  },
  red: {
    filled: "var(--z-color-danger, #f04438)",
    lighter: "#fff1f0",
    stroke: "#fda29b",
    text: "var(--z-color-danger, #f04438)",
    onFilled: "#ffffff"
  },
  green: {
    filled: "var(--z-color-success, #12b76a)",
    lighter: "#ecfdf3",
    stroke: "#a6f4c5",
    text: "var(--z-color-success, #12b76a)",
    onFilled: "#ffffff"
  },
  yellow: {
    filled: "#eaaa08",
    lighter: "#fef7e6",
    stroke: "#fedf89",
    text: "#b54708",
    onFilled: "#1f2937"
  },
  purple: {
    filled: "#7a5af8",
    lighter: "#f4f3ff",
    stroke: "#d9d6fe",
    text: "#6941c6",
    onFilled: "#ffffff"
  },
  sky: {
    filled: "#0ba5ec",
    lighter: "#f0f9ff",
    stroke: "#b9e6fe",
    text: "#026aa2",
    onFilled: "#ffffff"
  },
  pink: {
    filled: "#ee46bc",
    lighter: "#fdf2fa",
    stroke: "#fcceee",
    text: "#c11574",
    onFilled: "#ffffff"
  },
  teal: {
    filled: "#15b79e",
    lighter: "#f0fdfa",
    stroke: "#99f6e4",
    text: "#0f766e",
    onFilled: "#ffffff"
  }
};

function toneToConfig(tone: BadgeTone): { color: BadgeColor; variant: BadgeVariant } {
  if (tone === "info") {
    return { color: "blue", variant: "filled" };
  }
  if (tone === "success") {
    return { color: "green", variant: "filled" };
  }
  if (tone === "danger") {
    return { color: "red", variant: "filled" };
  }
  if (tone === "subtle") {
    return { color: "gray", variant: "lighter" };
  }
  return { color: "gray", variant: "stroke" };
}

const sizeTokens: Record<"sm" | "md", CSSProperties> = {
  sm: {
    minHeight: "16px",
    minWidth: "16px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.01em",
    paddingInline: "6px",
    gap: "4px"
  },
  md: {
    minHeight: "20px",
    minWidth: "20px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.01em",
    paddingInline: "7px",
    gap: "4px"
  }
};

export function Badge({
  children,
  tone = "neutral",
  variant,
  color,
  type = "basic",
  size = "md",
  icon,
  number,
  disabled = false,
  className,
  style
}: BadgeProps) {
  const legacy = toneToConfig(tone);
  const resolvedColor = color ?? legacy.color;
  const resolvedVariant = variant ?? legacy.variant;
  const palette = colorPalettes[resolvedColor];

  let content: ReactNode = children;
  if (typeof number === "number" || typeof number === "string") {
    content = number;
  } else if (number === true) {
    content = 8;
  }

  const isNumberOnly = number !== undefined && number !== false;
  const showDot = type === "dot" && !isNumberOnly;
  const showLeftIcon = type === "left-icon" && !isNumberOnly;
  const showRightIcon = type === "right-icon" && !isNumberOnly;
  const iconNode = icon ?? (
    <span
      className="ms"
      aria-hidden
      style={{ fontSize: size === "sm" ? "11px" : "12px", lineHeight: 1 }}
    >
      star
    </span>
  );

  const frameStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid transparent",
    whiteSpace: "nowrap",
    userSelect: "none",
    ...sizeTokens[size]
  };

  if (resolvedVariant === "filled") {
    frameStyle.background = palette.filled;
    frameStyle.borderColor = palette.filled;
    frameStyle.color = palette.onFilled;
  } else if (resolvedVariant === "lighter") {
    frameStyle.background = palette.lighter;
    frameStyle.borderColor = "transparent";
    frameStyle.color = palette.text;
  } else if (resolvedVariant === "stroke") {
    frameStyle.background = "var(--z-color-surface, #ffffff)";
    frameStyle.borderColor = palette.stroke;
    frameStyle.color = palette.text;
  } else {
    frameStyle.background = "var(--z-color-surface, #ffffff)";
    frameStyle.borderColor = "transparent";
    frameStyle.color = palette.text;
  }

  if (isNumberOnly) {
    frameStyle.paddingInline = "0";
  }

  if (disabled) {
    frameStyle.opacity = 0.45;
    frameStyle.cursor = "not-allowed";
    frameStyle.filter = "saturate(0.65)";
  }

  const dotStyle: CSSProperties = {
    width: size === "sm" ? "6px" : "7px",
    height: size === "sm" ? "6px" : "7px",
    borderRadius: "999px",
    background: resolvedVariant === "filled" ? palette.onFilled : palette.text,
    flexShrink: 0
  };

  return (
    <span className={className} style={{ ...frameStyle, ...style }}>
      {showDot ? <span aria-hidden style={dotStyle} /> : null}
      {showLeftIcon ? <span aria-hidden>{iconNode}</span> : null}
      {content}
      {showRightIcon ? <span aria-hidden>{iconNode}</span> : null}
    </span>
  );
}
