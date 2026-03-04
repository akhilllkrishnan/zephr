"use client";
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  useState
} from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Visual label rendered next to the radio */
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    className,
    style,
    label,
    disabled,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref
) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? Boolean(checked) : internalChecked;

  const wrapStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.5 : 1,
    ...style
  };

  const outerRingStyle: CSSProperties = {
    width: 18,
    height: 18,
    flexShrink: 0,
    borderRadius: "var(--z-radius-pill, 9999px)",
    borderWidth: "1.5px",
    borderStyle: "solid",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border-color 140ms ease, background 140ms ease, box-shadow 140ms ease",
    background: isChecked
      ? "var(--z-color-primary, #335cff)"
      : "var(--z-color-surface, #ffffff)",
    borderColor: focused
      ? "var(--z-color-text, #171717)"
      : isChecked
        ? "var(--z-color-primary, #335cff)"
        : hovered
          ? "var(--z-color-muted, #5c5c5c)"
          : "var(--z-color-border, #ebebeb)",
    boxShadow: focused
      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)"
      : "none"
  };

  const dotStyle: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "white",
    opacity: isChecked ? 1 : 0,
    transform: isChecked ? "scale(1)" : "scale(0)",
    transition: "opacity 140ms ease, transform 140ms ease"
  };

  return (
    <label className={className} style={wrapStyle}>
      {/* Visually-hidden native input — keeps form/keyboard behaviour */}
      <input
        ref={ref}
        type="radio"
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={(event) => {
          if (!isControlled) setInternalChecked(event.target.checked);
          onChange?.(event);
        }}
        onFocus={(event: FocusEvent<HTMLInputElement>) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          onBlur?.(event);
        }}
        onMouseEnter={(event: MouseEvent<HTMLInputElement>) => {
          if (!disabled) setHovered(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event: MouseEvent<HTMLInputElement>) => {
          setHovered(false);
          onMouseLeave?.(event);
        }}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          border: 0
        }}
        {...props}
      />
      {/* Custom visual ring + inner dot */}
      <span aria-hidden style={outerRingStyle}>
        <span style={dotStyle} />
      </span>
      {label != null && (
        <span
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "var(--z-color-text, #171717)"
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
});
