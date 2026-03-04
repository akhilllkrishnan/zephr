import { CSSProperties, ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  /** Show a success message below the control */
  success?: string;
  /** Show a spinner + "Saving…" indicator next to the label */
  pending?: boolean;
  htmlFor?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const spinnerStyle: CSSProperties = {
  display: "inline-block",
  width: "11px",
  height: "11px",
  borderRadius: "50%",
  border: "1.5px solid currentColor",
  borderTopColor: "transparent",
  animation: "z-spin 0.7s linear infinite",
  verticalAlign: "middle",
  marginLeft: "5px",
  opacity: 0.5
};

export function FormField({
  label,
  required = false,
  optional = false,
  hint,
  error,
  success,
  pending = false,
  htmlFor,
  className,
  style,
  children
}: FormFieldProps) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  return (
    <>
      <style>{`@keyframes z-spin { to { transform: rotate(360deg); } }`}</style>
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--z-space-1, 0.25rem)",
          ...style
        }}
      >
        <label
          htmlFor={htmlFor}
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            fontWeight: "var(--z-type-weight-medium, 500)",
            color: "var(--z-color-text, #171717)",
            display: "inline-flex",
            alignItems: "center",
            gap: "1px"
          }}
        >
          <span>{label}</span>
          {required ? <span style={{ color: "var(--z-color-primary, #335cff)" }}>*</span> : null}
          {optional ? (
            <span style={{ color: "var(--z-color-muted, #5c5c5c)", fontWeight: 400 }}>(Optional)</span>
          ) : null}
          {pending ? <span aria-hidden style={spinnerStyle} /> : null}
          {pending ? (
            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "var(--z-color-muted, #5c5c5c)",
                marginLeft: "4px"
              }}
            >
              Saving…
            </span>
          ) : null}
        </label>
        {children}
        {hint && !hasError && !hasSuccess ? (
          <span
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "var(--z-color-muted, #5c5c5c)",
              display: "inline-flex",
              gap: "4px"
            }}
          >
            <span aria-hidden style={{ width: "16px", textAlign: "center" }}>
              i
            </span>
            <span>{hint}</span>
          </span>
        ) : null}
        {hasError ? (
          <span
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "var(--z-color-danger, #ef4444)",
              display: "inline-flex",
              gap: "4px"
            }}
            role="alert"
          >
            <span aria-hidden style={{ width: "16px", textAlign: "center" }}>
              !
            </span>
            <span>{error}</span>
          </span>
        ) : null}
        {hasSuccess ? (
          <span
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "var(--z-color-success, #16a34a)",
              display: "inline-flex",
              gap: "4px"
            }}
            role="status"
          >
            <span aria-hidden style={{ width: "16px", textAlign: "center" }}>
              ✓
            </span>
            <span>{success}</span>
          </span>
        ) : null}
      </div>
    </>
  );
}
