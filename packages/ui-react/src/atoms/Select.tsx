"use client";
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  MouseEvent,
  SelectHTMLAttributes,
  useState
} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  controlSize?: "xs" | "sm" | "md";
}

const sizeStyles: Record<NonNullable<SelectProps["controlSize"]>, CSSProperties> = {
  xs: {
    minHeight: "32px",
    padding: "6px 30px 6px 10px",
    borderRadius: "8px"
  },
  sm: {
    minHeight: "36px",
    padding: "8px 32px 8px 12px",
    borderRadius: "8px"
  },
  md: {
    minHeight: "40px",
    padding: "10px 34px 10px 12px",
    borderRadius: "10px"
  }
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
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
    backgroundColor: "var(--z-color-surface, #ffffff)",
    color: "var(--z-color-text, #171717)",
    boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.006em",
    appearance: "none",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, var(--z-color-muted, #5c5c5c) 50%), linear-gradient(135deg, var(--z-color-muted, #5c5c5c) 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 16px) calc(50% - 2px), calc(100% - 12px) calc(50% - 2px)",
    backgroundSize: "4px 4px, 4px 4px",
    backgroundRepeat: "no-repeat",
    transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease"
  };

  if (hovered && !focused && !disabled && !invalid) {
    dynamicStyles.backgroundColor = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.boxShadow = "none";
  }

  if (focused && !disabled) {
    dynamicStyles.backgroundColor = "var(--z-color-surface, #ffffff)";
    dynamicStyles.borderColor = invalid
      ? "var(--z-color-danger, #fb3748)"
      : "var(--z-color-text, #171717)";
    dynamicStyles.boxShadow =
      "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.16)";
  }

  if (invalid && !focused) {
    dynamicStyles.borderColor = "var(--z-color-danger, #fb3748)";
    dynamicStyles.backgroundColor = "var(--z-color-surface, #ffffff)";
    dynamicStyles.boxShadow = "none";
  }

  if (disabled) {
    dynamicStyles.backgroundColor = "var(--z-color-weak, var(--z-color-background, #f7f7f7))";
    dynamicStyles.borderColor = "transparent";
    dynamicStyles.color = "#d1d1d1";
    dynamicStyles.boxShadow = "none";
    dynamicStyles.cursor = "not-allowed";
  }

  return (
    <select
      ref={ref}
      className={className}
      style={dynamicStyles}
      disabled={disabled}
      onFocus={(event: FocusEvent<HTMLSelectElement>) => {
        setFocused(event.currentTarget.matches(":focus-visible"));
        onFocus?.(event);
      }}
      onBlur={(event: FocusEvent<HTMLSelectElement>) => {
        setFocused(false);
        onBlur?.(event);
      }}
      onMouseEnter={(event: MouseEvent<HTMLSelectElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event: MouseEvent<HTMLSelectElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      {...props}
    />
  );
});
