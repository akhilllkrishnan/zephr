"use client";
import { CSSProperties, ReactNode } from "react";

export type TagStyle = "stroke" | "gray";

export interface TagProps {
  children?: ReactNode;
  /** Visual style — stroke (bordered) or gray (filled) */
  tagStyle?: TagStyle;
  /** Icon displayed before the label */
  icon?: ReactNode;
  /** Called when the dismiss × button is clicked */
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Tag({
  children,
  tagStyle = "stroke",
  icon,
  onDismiss,
  disabled = false,
  className,
  style
}: TagProps) {
  const frameStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    padding: "4px 8px",
    borderRadius: "6px",
    height: "24px",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0",
    whiteSpace: "nowrap",
    userSelect: "none",
    border: "1px solid",
    cursor: disabled ? "not-allowed" : "default",
    background:
      tagStyle === "stroke"
        ? "var(--z-color-surface, #ffffff)"
        : "var(--z-color-weak, #f7f7f7)",
    borderColor:
      tagStyle === "stroke" ? "var(--z-color-border, #ebebeb)" : "transparent",
    color: "var(--z-color-muted, #5c5c5c)",
    opacity: disabled ? 0.5 : 1,
    ...style
  };

  return (
    <span className={className} style={frameStyle}>
      {icon && (
        <span aria-hidden style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {children}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          disabled={disabled}
          onClick={onDismiss}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            padding: "0",
            marginLeft: "2px",
            cursor: disabled ? "not-allowed" : "pointer",
            color: "inherit",
            flexShrink: 0
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
