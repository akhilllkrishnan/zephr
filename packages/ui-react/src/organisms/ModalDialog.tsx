import { CSSProperties, ReactNode } from "react";
import { Button } from "../atoms/Button";

export interface ModalDialogProps {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  /** Show loading spinner on the confirm button */
  loading?: boolean;
  /** Error message displayed above the action buttons */
  error?: string;
  className?: string;
  style?: CSSProperties;
}

export function ModalDialog({
  open,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  error,
  className,
  style
}: ModalDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100 }}
      onClick={onCancel}
    >
      <div
        className={className}
        style={{
          width: "min(540px, 90vw)",
          margin: "10vh auto",
          background: "var(--z-color-surface, #ffffff)",
          borderRadius: "var(--z-radius-lg, 0.75rem)",
          boxShadow: "var(--z-shadow-lg, 0 16px 35px rgba(0,0,0,0.16))",
          padding: "var(--z-space-4, 1rem)",
          border: "1px solid var(--z-color-border, #ebebeb)",
          ...style
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          style={{
            fontSize: "var(--z-type-size-xl, 1.25rem)",
            fontWeight: "var(--z-type-weight-semibold, 600)",
            color: "var(--z-color-text, #171717)",
            margin: 0
          }}
        >
          {title}
        </h2>
        {description ? (
          <p
            style={{
              color: "var(--z-color-muted, #5c5c5c)",
              marginTop: "var(--z-space-2, 0.5rem)"
            }}
          >
            {description}
          </p>
        ) : null}
        {children ? (
          <div style={{ marginTop: "var(--z-space-3, 0.75rem)" }}>{children}</div>
        ) : null}
        {error ? (
          <p
            role="alert"
            style={{
              color: "var(--z-color-danger, #fb3748)",
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              marginTop: "var(--z-space-3, 0.75rem)",
              marginBottom: 0
            }}
          >
            {error}
          </p>
        ) : null}
        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "var(--z-space-4, 1rem)",
            gap: "var(--z-space-2, 0.5rem)"
          }}
        >
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          {onConfirm ? (
            <Button onClick={onConfirm} loading={loading}>
              {confirmLabel}
            </Button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
