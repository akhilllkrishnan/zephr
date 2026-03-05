"use client";
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  MouseEvent,
  TextareaHTMLAttributes,
  useState
} from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  controlSize?: "sm" | "md";
}

const sizeStyles: Record<NonNullable<TextareaProps["controlSize"]>, CSSProperties> = {
  sm: {
    padding: "8px 12px",
    borderRadius: "8px"
  },
  md: {
    padding: "10px 12px",
    borderRadius: "10px"
  }
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className,
    rows = 4,
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
    width: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--z-color-border, #ebebeb)",
    background: "var(--z-color-surface, #ffffff)",
    color: "var(--z-color-text, #171717)",
    boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.006em",
    transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
    resize: "vertical"
  };

  if (hovered && !focused && !disabled && !invalid) {
    dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.boxShadow = "none";
    dynamicStyles.color = "var(--z-color-muted, #5c5c5c)";
  }

  if (focused && !disabled) {
    dynamicStyles.background = "var(--z-color-surface, #ffffff)";
    dynamicStyles.borderColor = invalid
      ? "var(--z-color-danger, #fb3748)"
      : "var(--z-color-text, #171717)";
    dynamicStyles.boxShadow =
      "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.16)";
  }

  if (invalid && !focused) {
    dynamicStyles.borderColor = "var(--z-color-danger, #fb3748)";
    dynamicStyles.boxShadow = "none";
  }

  if (disabled) {
    dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.color = "#d1d1d1";
    dynamicStyles.boxShadow = "none";
    dynamicStyles.cursor = "not-allowed";
    dynamicStyles.resize = "none";
  }

  if (props.readOnly && !disabled) {
    dynamicStyles.background = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.color = "var(--z-color-muted, #5c5c5c)";
    dynamicStyles.boxShadow = "none";
    dynamicStyles.cursor = "default";
    dynamicStyles.resize = "none";
  }

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={className}
      style={dynamicStyles}
      disabled={disabled}
      onFocus={(event: FocusEvent<HTMLTextAreaElement>) => {
        setFocused(event.currentTarget.matches(":focus-visible"));
        onFocus?.(event);
      }}
      onBlur={(event: FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false);
        onBlur?.(event);
      }}
      onMouseEnter={(event: MouseEvent<HTMLTextAreaElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event: MouseEvent<HTMLTextAreaElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      {...props}
    />
  );
});
