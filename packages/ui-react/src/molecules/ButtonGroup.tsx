"use client";
import { CSSProperties, useMemo, useState } from "react";

export type ButtonGroupSize = "2xs" | "xs" | "sm";

export interface ButtonGroupProps {
  quantity?: 2 | 3 | 4 | 5 | 6;
  size?: ButtonGroupSize;
  labels?: string[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (nextIndex: number) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

interface GroupSizeToken {
  minHeight: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
  lineHeight: string;
}

const SIZE_TOKENS: Record<ButtonGroupSize, GroupSizeToken> = {
  sm: {
    minHeight: "36px",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    lineHeight: "20px"
  },
  xs: {
    minHeight: "32px",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    lineHeight: "20px"
  },
  "2xs": {
    minHeight: "24px",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    lineHeight: "16px"
  }
};

function clampIndex(index: number, quantity: number): number {
  if (Number.isNaN(index)) return 0;
  return Math.max(0, Math.min(quantity - 1, index));
}

export function ButtonGroup({
  quantity = 6,
  size = "sm",
  labels,
  value,
  defaultValue = 0,
  onValueChange,
  disabled = false,
  className,
  style,
  ariaLabel = "Button group"
}: ButtonGroupProps) {
  const isControlled = typeof value === "number";
  const [internalValue, setInternalValue] = useState<number>(clampIndex(defaultValue, quantity));
  const selectedIndex = clampIndex(isControlled ? (value as number) : internalValue, quantity);
  const tokens = SIZE_TOKENS[size];

  const items = useMemo(() => {
    const fallback = Array.from({ length: quantity }, (_, index) => `Button ${index + 1}`);
    if (!labels?.length) return fallback;
    return fallback.map((item, index) => labels[index] ?? item);
  }, [labels, quantity]);

  function updateValue(nextIndex: number): void {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(nextIndex);
    }
    onValueChange?.(nextIndex);
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: tokens.borderRadius,
        overflow: "hidden",
        background: "var(--z-color-surface, #ffffff)",
        ...style
      }}
    >
      {items.map((label, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={`${label}-${index}`}
            type="button"
            aria-pressed={isActive}
            disabled={disabled}
            onClick={() => updateValue(index)}
            style={{
              minHeight: tokens.minHeight,
              padding: tokens.padding,
              border: "none",
              borderRight:
                index === items.length - 1 ? "none" : "1px solid var(--z-color-border, #ebebeb)",
              background: isActive
                ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
                : "var(--z-color-surface, #ffffff)",
              color: isActive
                ? "var(--z-color-text, #171717)"
                : "var(--z-color-muted, #5c5c5c)",
              fontSize: tokens.fontSize,
              lineHeight: tokens.lineHeight,
              fontWeight: 500,
              letterSpacing: size === "2xs" ? "0" : "-0.006em",
              whiteSpace: "nowrap",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
              transition: "background-color 140ms ease, color 140ms ease"
            }}
          >
            {labels ? label : "Button"}
          </button>
        );
      })}
    </div>
  );
}
