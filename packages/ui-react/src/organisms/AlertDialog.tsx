"use client";
import { CSSProperties, ReactNode, useEffect, useId } from "react";

export interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    /** Dialog title text */
    title: string;
    /** Descriptive body content */
    description?: ReactNode;
    /** Primary action label */
    confirmLabel?: string;
    /** Called when the confirm button is clicked */
    onConfirm?: () => void;
    /** Cancel button label */
    cancelLabel?: string;
    /** Tone of the confirm action */
    confirmTone?: "primary" | "danger";
    /** Whether the confirm action is in a loading state */
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
}

const toneColors: Record<NonNullable<AlertDialogProps["confirmTone"]>, CSSProperties> = {
    primary: {
        background: "var(--z-color-primary, #335cff)",
        color: "var(--z-color-primaryContrast, #ffffff)"
    },
    danger: {
        background: "var(--z-color-danger, #ef4444)",
        color: "#ffffff"
    }
};

export function AlertDialog({
    open,
    onClose,
    title,
    description,
    confirmLabel = "Confirm",
    onConfirm,
    cancelLabel = "Cancel",
    confirmTone = "primary",
    loading = false,
    className,
    style
}: AlertDialogProps) {
    const titleId = useId();
    const descId = useId();

    // ESC to close
    useEffect(() => {
        if (!open) return;
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Body scroll lock
    useEffect(() => {
        if (typeof document === "undefined") return;
        if (open) document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    const btnBase: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        padding: "0 var(--z-space-4, 1rem)",
        borderRadius: "var(--z-radius-md, 8px)",
        border: "none",
        fontSize: "var(--z-type-size-sm, 0.875rem)",
        fontWeight: "var(--z-type-weight-medium, 500)" as CSSProperties["fontWeight"],
        cursor: "pointer",
        transition: "opacity 120ms ease, background 120ms ease"
    };

    return (
        <>
            {/* Overlay */}
            <div
                aria-hidden
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 700,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(2px)"
                }}
            />
            {/* Panel */}
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descId : undefined}
                className={className}
                style={{
                    position: "fixed",
                    zIndex: 701,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(440px, calc(100vw - 2rem))",
                    background: "var(--z-color-surface, #ffffff)",
                    border: "1px solid var(--z-color-border, #ebebeb)",
                    borderRadius: "var(--z-radius-lg, 14px)",
                    boxShadow: "0 16px 48px rgba(14,18,27,0.2)",
                    padding: "var(--z-space-6, 1.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--z-space-4, 1rem)",
                    ...style
                }}
            >
                {/* Title */}
                <p
                    id={titleId}
                    style={{
                        margin: 0,
                        fontWeight: "var(--z-type-weight-semibold, 600)" as CSSProperties["fontWeight"],
                        fontSize: "var(--z-type-size-lg, 1.125rem)",
                        color: "var(--z-color-text, #171717)",
                        lineHeight: 1.4
                    }}
                >
                    {title}
                </p>

                {/* Description */}
                {description && (
                    <p
                        id={descId}
                        style={{
                            margin: 0,
                            fontSize: "var(--z-type-size-sm, 0.875rem)",
                            color: "var(--z-color-muted, #737373)",
                            lineHeight: 1.6
                        }}
                    >
                        {description}
                    </p>
                )}

                {/* Actions */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "var(--z-space-2, 0.5rem)",
                        marginTop: "var(--z-space-2, 0.5rem)"
                    }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            ...btnBase,
                            background: "var(--z-color-weak, #f5f5f5)",
                            color: "var(--z-color-text, #171717)"
                        }}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        aria-busy={loading}
                        style={{
                            ...btnBase,
                            ...toneColors[confirmTone],
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "…" : confirmLabel}
                    </button>
                </div>
            </div>
        </>
    );
}
