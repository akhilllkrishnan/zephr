"use client";
import {
    CSSProperties,
    ReactNode,
    useEffect,
    useId
} from "react";

export interface SheetProps {
    open: boolean;
    onClose: () => void;
    /** Which edge the sheet slides in from */
    side?: "left" | "right" | "bottom";
    /** Width (for left/right) or height (for bottom) */
    size?: string | number;
    /** Sheet panel content */
    children: ReactNode;
    /** Optional title shown in the sheet header */
    title?: string;
    /** Show a semi-transparent overlay behind the sheet */
    overlay?: boolean;
    className?: string;
    style?: CSSProperties;
}

const ANIMATION = `
@keyframes z-sheet-in-right  { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes z-sheet-in-left   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes z-sheet-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes z-sheet-out-right  { from { transform: translateX(0); } to { transform: translateX(100%); } }
@keyframes z-sheet-out-left   { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes z-sheet-out-bottom { from { transform: translateY(0); } to { transform: translateY(100%); } }
`;

let sheetKFInjected = false;
function ensureSheetKeyframes() {
    if (typeof document === "undefined" || sheetKFInjected) return;
    const s = document.createElement("style");
    s.textContent = ANIMATION;
    document.head.appendChild(s);
    sheetKFInjected = true;
}

export function Sheet({
    open,
    onClose,
    side = "right",
    size = side === "bottom" ? "50vh" : "380px",
    children,
    title,
    overlay = true,
    className,
    style
}: SheetProps) {
    const titleId = useId();
    const resolvedSize = typeof size === "number" ? `${size}px` : size;

    useEffect(() => { ensureSheetKeyframes(); }, []);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (typeof document === "undefined") return;
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    const panelStyle: CSSProperties = {
        position: "fixed",
        zIndex: 600,
        background: "var(--z-color-surface, #ffffff)",
        boxShadow: "0 0 40px rgba(14,18,27,0.18)",
        display: "flex",
        flexDirection: "column",
        ...(side === "right" && { top: 0, right: 0, bottom: 0, width: resolvedSize }),
        ...(side === "left" && { top: 0, left: 0, bottom: 0, width: resolvedSize }),
        ...(side === "bottom" && { left: 0, right: 0, bottom: 0, height: resolvedSize }),
        animation: `z-sheet-in-${side} 260ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
    };

    return (
        <>
            {overlay && (
                <div
                    aria-hidden
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 599,
                        background: "rgba(0,0,0,0.45)",
                        backdropFilter: "blur(2px)",
                        animation: "none"
                    }}
                />
            )}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                className={className}
                style={{ ...panelStyle, ...style }}
            >
                {title && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "var(--z-space-4, 1rem) var(--z-space-5, 1.25rem)",
                            borderBottom: "1px solid var(--z-color-border, #ebebeb)"
                        }}
                    >
                        <span
                            id={titleId}
                            style={{
                                fontWeight: "var(--z-type-weight-semibold, 600)" as CSSProperties["fontWeight"],
                                fontSize: "var(--z-type-size-base, 1rem)",
                                color: "var(--z-color-text, #171717)"
                            }}
                        >
                            {title}
                        </span>
                        <button
                            type="button"
                            aria-label="Close panel"
                            onClick={onClose}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: 20,
                                lineHeight: 1,
                                color: "var(--z-color-muted, #737373)",
                                padding: "var(--z-space-1, 0.25rem)"
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "var(--z-space-5, 1.25rem)"
                    }}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
