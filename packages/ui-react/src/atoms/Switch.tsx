"use client";
import { CSSProperties, FocusEvent, KeyboardEvent, useState } from "react";

export type SwitchVisualState = "default" | "hover" | "pressed" | "disabled";

export interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  /** Force a visual state for previews/docs */
  visualState?: SwitchVisualState;
  className?: string;
  label?: string;
  /** Track size — default "md" */
  size?: "sm" | "md";
}

const SIZES = {
  sm: { trackW: 32, trackH: 20, thumbSize: 12, thumbGap: 4 },
  md: { trackW: 40, trackH: 24, thumbSize: 16, thumbGap: 4 }
} as const;

export function Switch({ checked, onChange, disabled, visualState, className, label, size = "md" }: SwitchProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { trackW, trackH, thumbSize, thumbGap } = SIZES[size];
  const thumbTravel = trackW - thumbSize - thumbGap * 2;
  const computedDisabled = Boolean(disabled) || visualState === "disabled";
  const computedHovered = visualState ? visualState === "hover" : hovered;
  const computedPressed = visualState === "pressed";

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!computedDisabled) onChange(!checked);
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
      : computedDisabled
        ? "var(--z-color-border, #ebebeb)"
        : "transparent",
    background: checked
      ? "var(--z-color-primary, #335cff)"
      : computedHovered && !computedDisabled
        ? "var(--z-color-sub, #d1d1d1)"
        : computedDisabled
          ? "var(--z-color-surface, #ffffff)"
          : "var(--z-color-weak, #ebebeb)",
    cursor: computedDisabled ? "not-allowed" : "pointer",
    transition: "background 160ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 80ms ease",
    outline: "none",
    boxShadow: focused
      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)"
      : "none",
    transform: computedPressed ? "scale(0.96)" : computedHovered && !computedDisabled && !focused ? "scale(1.02)" : "scale(1)"
  };

  const thumbStyle: CSSProperties = {
    position: "absolute",
    left: thumbGap,
    width: thumbSize,
    height: thumbSize,
    borderRadius: "var(--z-radius-pill, 9999px)",
    background: "var(--z-color-surface, #ffffff)",
    boxShadow: computedPressed ? "0 1px 2px rgba(0,0,0,0.14)" : "0 1px 3px rgba(0,0,0,0.18)",
    transform: checked ? `translateX(${thumbTravel}px)` : "translateX(0)",
    transition: "transform 160ms ease"
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={computedDisabled}
      onClick={() => !computedDisabled && onChange(!checked)}
      onKeyDown={onKeyDown}
      onFocus={(event) => setFocused(event.currentTarget.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
      onMouseEnter={() => { if (!computedDisabled) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={trackStyle}
    >
      <span aria-hidden style={thumbStyle} />
    </button>
  );
}
