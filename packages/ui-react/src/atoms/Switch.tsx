"use client";
import { CSSProperties, FocusEvent, KeyboardEvent, useState } from "react";

export interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  /** Track size — default "md" */
  size?: "sm" | "md";
}

const SIZES = {
  sm: { trackW: 32, trackH: 18, thumbSize: 12, thumbGap: 3 },
  md: { trackW: 40, trackH: 22, thumbSize: 16, thumbGap: 3 }
} as const;

export function Switch({ checked, onChange, disabled, className, label, size = "md" }: SwitchProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { trackW, trackH, thumbSize, thumbGap } = SIZES[size];
  const thumbTravel = trackW - thumbSize - thumbGap * 2;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!disabled) onChange(!checked);
    }
  }

  const trackStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    width: trackW,
    height: trackH,
    minWidth: trackW,
    borderRadius: "var(--z-radius-pill, 9999px)",
    border: "1px solid",
    borderColor: focused
      ? "var(--z-color-text, #171717)"
      : checked
        ? "var(--z-color-primary, #335cff)"
        : hovered && !disabled
          ? "var(--z-color-muted, #5c5c5c)"
          : "var(--z-color-border, #ebebeb)",
    background: checked
      ? "var(--z-color-primary, #335cff)"
      : "var(--z-color-weak, #f0f0f0)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background 160ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 80ms ease",
    outline: "none",
    boxShadow: focused
      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)"
      : "none",
    transform: hovered && !disabled && !focused ? "scale(1.03)" : "scale(1)"
  };

  const thumbStyle: CSSProperties = {
    position: "absolute",
    left: thumbGap,
    width: thumbSize,
    height: thumbSize,
    borderRadius: "var(--z-radius-pill, 9999px)",
    background: "var(--z-color-surface, #ffffff)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
    transform: checked ? `translateX(${thumbTravel}px)` : "translateX(0)",
    transition: "transform 160ms ease"
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={onKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseEnter={() => { if (!disabled) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={trackStyle}
    >
      <span aria-hidden style={thumbStyle} />
    </button>
  );
}
