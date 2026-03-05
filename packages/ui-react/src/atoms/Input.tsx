"use client";
import { CSSProperties, FocusEvent, forwardRef, InputHTMLAttributes, MouseEvent, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  controlSize?: "xs" | "sm" | "md";
}

const sizeStyles: Record<NonNullable<InputProps["controlSize"]>, CSSProperties> = {
  xs: {
    minHeight: "32px",
    padding: "6px 10px",
    borderRadius: "8px"
  },
  sm: {
    minHeight: "36px",
    padding: "8px 12px",
    borderRadius: "8px"
  },
  md: {
    minHeight: "40px",
    padding: "10px 12px",
    borderRadius: "10px"
  }
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    type = "text",
    controlSize = "md",
    disabled,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";

  const dynamicStyles: CSSProperties = {
    ...sizeStyles[controlSize],
    borderWidth: "1px",
    borderStyle: "solid",
    width: "100%",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.006em",
    transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
    background: "var(--z-color-surface, #ffffff)",
    borderColor: "var(--z-color-border, #ebebeb)",
    color: "var(--z-color-text, #171717)",
    boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)"
  };

  if (hovered && !focused && !disabled && !invalid) {
    dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.color = "var(--z-color-muted, #5c5c5c)";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.boxShadow = "none";
  }

  if (focused && !disabled) {
    dynamicStyles.background = "var(--z-color-surface, #ffffff)";
    dynamicStyles.borderColor = invalid
      ? "var(--z-color-danger, #fb3748)"
      : "var(--z-color-text, #171717)";
    dynamicStyles.color = "var(--z-color-text, #171717)";
    dynamicStyles.boxShadow =
      "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.16)";
  }

  if (invalid && !focused) {
    dynamicStyles.borderColor = "var(--z-color-danger, #fb3748)";
    dynamicStyles.color = "var(--z-color-text, #171717)";
    dynamicStyles.background = "var(--z-color-surface, #ffffff)";
    dynamicStyles.boxShadow = "none";
  }

  if (disabled) {
    dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.color = "#d1d1d1";
    dynamicStyles.boxShadow = "none";
    dynamicStyles.cursor = "not-allowed";
  }

  if (props.readOnly && !disabled) {
    dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.color = "var(--z-color-muted, #5c5c5c)";
    dynamicStyles.boxShadow = "none";
    dynamicStyles.cursor = "default";
  }

  return (
    <input
      ref={ref}
      type={type}
      className={className}
      style={dynamicStyles}
      disabled={disabled}
      onFocus={(event: FocusEvent<HTMLInputElement>) => {
        setFocused(event.currentTarget.matches(":focus-visible"));
        onFocus?.(event);
      }}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
      }}
      onMouseEnter={(event: MouseEvent<HTMLInputElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event: MouseEvent<HTMLInputElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      {...props}
    />
  );
});
