"use client";
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  useRef,
  useState
} from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Visual label rendered next to the checkbox */
  label?: ReactNode;
  /** Shows a dash (−) instead of checkmark — uncontrolled unless `checked` is provided */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    className,
    style,
    label,
    indeterminate = false,
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
  const showIndeterminate = indeterminate && !isChecked;

  const wrapStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.5 : 1,
    ...style
  };

  const boxStyle: CSSProperties = {
    width: 18,
    height: 18,
    flexShrink: 0,
    borderRadius: "var(--z-radius-sm, 4px)",
    borderWidth: "1.5px",
    borderStyle: "solid",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border-color 140ms ease, background 140ms ease, box-shadow 140ms ease",
    background:
      isChecked || showIndeterminate
        ? "var(--z-color-primary, #335cff)"
        : "var(--z-color-surface, #ffffff)",
    borderColor:
      focused
        ? "var(--z-color-text, #171717)"
        : isChecked || showIndeterminate
          ? "var(--z-color-primary, #335cff)"
          : hovered
            ? "var(--z-color-muted, #5c5c5c)"
            : "var(--z-color-border, #ebebeb)",
    boxShadow: focused
      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)"
      : "none"
  };

  return (
    <label className={className} style={wrapStyle}>
      {/* Hidden native input — keeps form integration & keyboard behaviour */}
      <input
        ref={ref}
        type="checkbox"
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
          // Visually hidden but still focusable & form-accessible
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
      {/* Custom visual box */}
      <span aria-hidden style={boxStyle}>
        {isChecked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ display: "block" }}>
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {showIndeterminate && (
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none" style={{ display: "block" }}>
            <path d="M1 1H9" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        )}
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
