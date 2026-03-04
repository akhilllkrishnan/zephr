import { CSSProperties, ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "info" | "success" | "danger" | "subtle";
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, CSSProperties> = {
  neutral: {
    background: "var(--z-color-surface, #ffffff)",
    color: "var(--z-color-text, #171717)",
    borderColor: "var(--z-color-border, #ebebeb)"
  },
  info: {
    background: "var(--z-color-primary, #335cff)",
    color: "var(--z-color-primaryContrast, #ffffff)",
    borderColor: "var(--z-color-primary, #335cff)"
  },
  success: {
    background: "var(--z-color-success, #1fc16b)",
    color: "#ffffff",
    borderColor: "var(--z-color-success, #1fc16b)"
  },
  danger: {
    background: "var(--z-color-danger, #ef4444)",
    color: "#ffffff",
    borderColor: "var(--z-color-danger, #ef4444)"
  },
  /** Muted tint — no solid fill */
  subtle: {
    background: "var(--z-color-weak, #f5f5f5)",
    color: "var(--z-color-muted, #5c5c5c)",
    borderColor: "var(--z-color-border, #ebebeb)"
  }
};

const sizeTokens: Record<NonNullable<BadgeProps["size"]>, CSSProperties> = {
  sm: {
    paddingTop: "1px",
    paddingBottom: "1px",
    paddingLeft: "var(--z-space-1, 0.25rem)",
    paddingRight: "var(--z-space-1, 0.25rem)",
    fontSize: "11px",
    letterSpacing: "0.01em"
  },
  md: {
    paddingTop: "var(--z-space-1, 0.25rem)",
    paddingBottom: "var(--z-space-1, 0.25rem)",
    paddingLeft: "var(--z-space-2, 0.5rem)",
    paddingRight: "var(--z-space-2, 0.5rem)",
    fontSize: "var(--z-type-size-sm, 0.875rem)"
  }
};

export function Badge({ children, tone = "neutral", size = "md", className, style }: BadgeProps) {
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "var(--z-radius-pill, 9999px)",
    border: "1px solid",
    fontWeight: "var(--z-type-weight-medium, 500)" as CSSProperties["fontWeight"],
    lineHeight: 1.2,
    ...sizeTokens[size],
    ...toneStyles[tone],
    ...style
  };

  return (
    <span className={className} style={baseStyle}>
      {children}
    </span>
  );
}
