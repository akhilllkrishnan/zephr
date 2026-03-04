"use client";
import { ButtonHTMLAttributes, CSSProperties, FocusEvent, KeyboardEvent, PointerEvent, ReactNode, forwardRef, useState } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  tone?: "default" | "primary" | "danger";
  compactSize?: "md" | "lg";
  fullRadius?: boolean;
}

function toneStyles(
  tone: NonNullable<IconButtonProps["tone"]>,
  disabled: boolean,
  hovered: boolean,
  focused: boolean
): CSSProperties {
  if (disabled) {
    return {
      background: "transparent",
      borderColor: "transparent",
      color: "#b5b5b5",
      boxShadow: "none",
      cursor: "not-allowed"
    };
  }

  if (tone === "primary") {
    return {
      background: "var(--z-color-primary, #121212)",
      borderColor: "rgba(255, 255, 255, 0.12)",
      color: "var(--z-color-primaryContrast, #ffffff)",
      boxShadow: focused
        ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
        : hovered
          ? "0 3px 10px rgba(14, 18, 27, 0.20), 0 0 0 1px var(--z-color-primary, #121212)"
          : "0 1px 2px rgba(14, 18, 27, 0.24), 0 0 0 1px var(--z-color-primary, #121212)"
    };
  }

  if (tone === "danger") {
    return {
      background: "var(--z-color-danger, #fb3748)",
      borderColor: "rgba(255, 255, 255, 0.12)",
      color: "#ffffff",
      boxShadow: focused
        ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
        : hovered
          ? "0 3px 10px rgba(14, 18, 27, 0.20), 0 0 0 1px var(--z-color-danger, #fb3748)"
          : "0 1px 2px rgba(14, 18, 27, 0.24), 0 0 0 1px var(--z-color-danger, #fb3748)"
    };
  }

  return {
    background: hovered
      ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
      : "var(--z-color-surface, #ffffff)",
    borderColor: focused ? "var(--z-color-text, #171717)" : "var(--z-color-border, #ebebeb)",
    color: "var(--z-color-text, #171717)",
    boxShadow: focused
      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)"
      : hovered
        ? "0 2px 8px rgba(10, 13, 20, 0.08)"
        : "0 1px 2px rgba(10, 13, 20, 0.03)"
  };
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      label,
      tone = "default",
      compactSize = "lg",
      fullRadius = false,
      className,
      type = "button",
      disabled,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onKeyDown,
      onKeyUp,
      onBlur,
      style: styleProp,
      ...props
    },
    ref
  ) {
    const [isHovered, setHovered] = useState(false);
    const [isPressed, setPressed] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const size = compactSize === "lg" ? "28px" : "24px";

    function handlePointerEnter(event: PointerEvent<HTMLButtonElement>) {
      if (!disabled) {
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
      if (!disabled && event.button === 0) {
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
      if (!disabled && (event.key === "Enter" || event.key === " ")) {
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

    const style: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      padding: compactSize === "lg" ? "2px" : "1px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: fullRadius ? "999px" : "6px",
      transform: isPressed ? "scale(0.97)" : isHovered ? "translateY(-1px)" : "translateY(0)",
      transition:
        "background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 90ms ease",
      willChange: "transform",
      outline: "none",
      ...toneStyles(tone, Boolean(disabled), isHovered, isFocused),
      ...styleProp
    };

    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={className}
        style={style}
        disabled={disabled}
        data-z-button="true"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={() => !disabled && setFocused(true)}
        onBlur={handleBlur}
        {...props}
      >
        <span aria-hidden style={{ width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </span>
      </button>
    );
  }
);
