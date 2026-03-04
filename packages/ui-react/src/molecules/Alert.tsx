import { CSSProperties, ReactNode } from "react";

export type AlertStatus = "error" | "warning" | "success" | "info" | "feature";
export type AlertVariant = "filled" | "light" | "lighter" | "stroke";
export type AlertSize = "xs" | "sm" | "lg";

export interface AlertProps {
  title: ReactNode;
  description?: ReactNode;
  status?: AlertStatus;
  variant?: AlertVariant;
  size?: AlertSize;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
}

interface AlertPalette {
  base: string;
  light: string;
  lighter: string;
  onBase: string;
  onLight: string;
  icon: string;
}

function paletteForStatus(status: AlertStatus): AlertPalette {
  if (status === "error") {
    return {
      base: "var(--z-color-danger, #fb3748)",
      light: "#ffd7dc",
      lighter: "#fff0f2",
      onBase: "#ffffff",
      onLight: "var(--z-color-text, #171717)",
      icon: "!"
    };
  }

  if (status === "warning") {
    return {
      base: "var(--z-color-warning, var(--z-color-accent, #fa7319))",
      light: "#ffe6d1",
      lighter: "#fff5eb",
      onBase: "#ffffff",
      onLight: "var(--z-color-text, #171717)",
      icon: "!"
    };
  }

  if (status === "success") {
    return {
      base: "var(--z-color-success, #1fc16b)",
      light: "#c2f5da",
      lighter: "#ecfbf3",
      onBase: "#ffffff",
      onLight: "var(--z-color-text, #171717)",
      icon: "✓"
    };
  }

  if (status === "feature") {
    return {
      base: "var(--z-color-feature, var(--z-color-accent, #7d52f4))",
      light: "#e7ddff",
      lighter: "#f5f0ff",
      onBase: "#ffffff",
      onLight: "var(--z-color-text, #171717)",
      icon: "✦"
    };
  }

  return {
    base: "var(--z-color-verified, var(--z-color-primary, #47c2ff))",
    light: "#d9f3ff",
    lighter: "#f0f9ff",
    onBase: "#ffffff",
    onLight: "var(--z-color-text, #171717)",
    icon: "i"
  };
}

function styleForVariant(
  variant: AlertVariant,
  palette: AlertPalette
): Pick<CSSProperties, "background" | "color" | "border" | "boxShadow"> {
  if (variant === "filled") {
    return {
      background: palette.base,
      color: palette.onBase,
      border: "1px solid transparent",
      boxShadow: "none"
    };
  }

  if (variant === "light") {
    return {
      background: palette.light,
      color: palette.onLight,
      border: "1px solid transparent",
      boxShadow: "none"
    };
  }

  if (variant === "lighter") {
    return {
      background: palette.lighter,
      color: palette.onLight,
      border: "1px solid transparent",
      boxShadow: "none"
    };
  }

  return {
    background: "var(--z-color-surface, #ffffff)",
    color: "var(--z-color-text, #171717)",
    border: "1px solid var(--z-color-border, #ebebeb)",
    boxShadow: "0 16px 32px -12px rgba(14, 18, 27, 0.1)"
  };
}

function sizeStyles(size: AlertSize): CSSProperties {
  if (size === "xs") {
    return {
      minHeight: "32px",
      padding: "8px",
      borderRadius: "8px",
      fontSize: "12px",
      lineHeight: "16px"
    };
  }

  if (size === "sm") {
    return {
      minHeight: "36px",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "12px",
      lineHeight: "16px"
    };
  }

  return {
    minHeight: "124px",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "14px",
    lineHeight: "20px"
  };
}

export function Alert({
  title,
  description,
  status = "info",
  variant = "filled",
  size = "xs",
  actionLabel,
  onAction,
  dismissible = false,
  onDismiss,
  icon,
  className
}: AlertProps) {
  const palette = paletteForStatus(status);
  const toneStyles = styleForVariant(variant, palette);
  const frameStyles = sizeStyles(size);
  const hasBody = Boolean(description) || size === "lg";
  const iconColor = variant === "filled" ? palette.onBase : palette.base;

  return (
    <div
      className={className}
      role="status"
      style={{
        ...frameStyles,
        ...toneStyles,
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--z-space-2, 0.5rem)",
        letterSpacing: "0",
        width: "100%"
      }}
    >
      <span
        aria-hidden
        style={{
          width: "24px",
          minWidth: "24px",
          textAlign: "center",
          color: iconColor,
          fontWeight: 700
        }}
      >
        {icon ?? palette.icon}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontWeight: 500 }}>{title}</span>
        {description ? (
          <span
            style={{
              marginTop: "6px",
              display: "block",
              color: variant === "filled" ? palette.onBase : "var(--z-color-muted, #5c5c5c)",
              opacity: hasBody ? 0.95 : 1
            }}
          >
            {description}
          </span>
        ) : null}
      </span>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          style={{
            border: 0,
            background: "transparent",
            color: "inherit",
            textDecoration: "underline",
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          {actionLabel}
        </button>
      ) : null}
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={onDismiss}
          style={{
            border: 0,
            background: "transparent",
            color: "inherit",
            fontSize: "14px",
            lineHeight: "16px",
            cursor: "pointer",
            opacity: 0.8
          }}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
