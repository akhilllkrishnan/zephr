"use client";
import { ButtonHTMLAttributes, CSSProperties, FocusEvent, KeyboardEvent, PointerEvent, ReactNode, forwardRef, useState } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  /** Show an inline spinner and disable interaction */
  loading?: boolean;
}

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, CSSProperties> = {
  sm: {
    minHeight: "32px",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "14px"
  },
  md: {
    minHeight: "36px",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "14px"
  },
  lg: {
    minHeight: "40px",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px"
  }
};

const spinnerStyle: CSSProperties = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "2px solid currentColor",
  borderTopColor: "transparent",
  flexShrink: 0,
  animation: "z-spin 0.7s linear infinite"
};

function getVariantStyles(
  variant: NonNullable<ButtonProps["variant"]>,
  disabled: boolean,
  hovered: boolean,
  focused: boolean
): CSSProperties {
  if (disabled) {
    return {
      background: "var(--z-color-weak, var(--z-color-background, #f7f7f7))",
      borderColor: "transparent",
      boxShadow: "none",
      color: "#d1d1d1",
      cursor: "not-allowed",
      outline: "none"
    };
  }

  if (variant === "secondary") {
    return {
      background: hovered
        ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
        : "var(--z-color-surface, #ffffff)",
      borderColor: "var(--z-color-border, #ebebeb)",
      boxShadow: hovered ? "0 2px 8px rgba(10, 13, 20, 0.08)" : "none",
      color: "var(--z-color-text, #171717)"
    };
  }

  if (variant === "ghost") {
    return {
      background: hovered
        ? "var(--z-color-border, #ebebeb)"
        : "var(--z-color-weak, var(--z-color-background, #f7f7f7))",
      borderColor: "transparent",
      boxShadow: "none",
      color: "var(--z-color-text, #171717)"
    };
  }

  if (variant === "danger") {
    return {
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), var(--z-color-danger, #fb3748)",
      borderColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: hovered
        ? "0 3px 10px rgba(14, 18, 27, 0.18), inset 0 0 0 1px var(--z-color-danger, #fb3748)"
        : "inset 0 0 0 1px var(--z-color-danger, #fb3748)",
      color: "#ffffff"
    };
  }

  return {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), var(--z-color-primary, #121212)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    boxShadow: focused
      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
      : hovered
        ? "0 3px 10px rgba(14, 18, 27, 0.18), inset 0 0 0 1px var(--z-color-primary, #121212)"
        : "inset 0 0 0 1px var(--z-color-primary, #121212)",
    color: "var(--z-color-primaryContrast, #ffffff)"
  };
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    startIcon,
    endIcon,
    fullWidth = false,
    className,
    type = "button",
    disabled,
    loading = false,
    children,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onKeyDown,
    onKeyUp,
    onBlur,
    style,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const [isHovered, setHovered] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const [isFocused, setFocused] = useState(false);

  function handlePointerEnter(event: PointerEvent<HTMLButtonElement>) {
    if (!isDisabled) {
      setHovered(true);
    }
    onPointerEnter?.(event);
  }

  function handlePointerLeave(event: PointerEvent<HTMLButtonElement>) {
    setHovered(false);
    setPressed(false);
    onPointerLeave?.(event);
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (!isDisabled && event.button === 0) {
      setPressed(true);
    }
    onPointerDown?.(event);
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    setPressed(false);
    onPointerUp?.(event);
  }

  function handlePointerCancel(event: PointerEvent<HTMLButtonElement>) {
    setPressed(false);
    onPointerCancel?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!isDisabled && (event.key === "Enter" || event.key === " ")) {
      setPressed(true);
    }
    onKeyDown?.(event);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLButtonElement>) {
    setPressed(false);
    onKeyUp?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLButtonElement>) {
    setPressed(false);
    setFocused(false);
    onBlur?.(event);
  }

  const computedStyle: CSSProperties = {
    ...sizeStyles[size],
    ...getVariantStyles(variant, isDisabled, isHovered, isFocused),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--z-space-2, 0.5rem)",
    borderWidth: "1px",
    borderStyle: "solid",
    transform: isPressed ? "scale(0.97)" : isHovered ? "translateY(-1px)" : "translateY(0)",
    willChange: "transform",
    fontWeight: 500,
    letterSpacing: "-0.006em",
    lineHeight: "20px",
    outline: "none",
    transition:
      "background-color 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 90ms ease",
    ...style,
    width: fullWidth ? "100%" : undefined
  };

  return (
    <>
      {/* Keyframe injected inline once — idempotent by style id */}
      <style>{`@keyframes z-spin { to { transform: rotate(360deg); } }`}</style>
      <button
        ref={ref}
        type={type}
        className={className}
        style={computedStyle}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-z-button="true"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={() => !isDisabled && setFocused(true)}
        onBlur={handleBlur}
        {...props}
      >
        {loading ? <span aria-hidden style={spinnerStyle} /> : startIcon ? <span aria-hidden>{startIcon}</span> : null}
        <span>{children}</span>
        {endIcon ? <span aria-hidden>{endIcon}</span> : null}
      </button>
    </>
  );
});
