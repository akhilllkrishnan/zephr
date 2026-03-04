"use client";
import {
    CSSProperties,
    ReactNode,
    useEffect,
    useId,
    useRef,
    useState
} from "react";

export interface PopoverProps {
    /** Trigger element */
    trigger: ReactNode;
    /** Popover panel content */
    children: ReactNode;
    /** Preferred side to open on (auto-flips if space is tight) */
    side?: "top" | "bottom" | "left" | "right";
    /** Alignment along the cross-axis */
    align?: "start" | "center" | "end";
    /** Whether the popover is open (controlled mode) */
    open?: boolean;
    /** Called when open state should change (controlled mode) */
    onOpenChange?: (open: boolean) => void;
    /** Width of the popover panel */
    width?: string | number;
    className?: string;
    style?: CSSProperties;
}

const alignOffset: Record<string, string> = {
    start: "0%",
    center: "50%",
    end: "100%"
};

export function Popover({
    trigger,
    children,
    side = "bottom",
    align = "start",
    open: controlledOpen,
    onOpenChange,
    width = 280,
    className,
    style
}: PopoverProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const id = useId();
    const wrapRef = useRef<HTMLDivElement>(null);

    function toggle() {
        const next = !open;
        if (!isControlled) setInternalOpen(next);
        onOpenChange?.(next);
    }

    function close() {
        if (!isControlled) setInternalOpen(false);
        onOpenChange?.(false);
    }

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        function onPointerDown(e: PointerEvent) {
            if (!wrapRef.current?.contains(e.target as Node)) close();
        }
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const panelStyle: CSSProperties = {
        position: "absolute",
        zIndex: 400,
        minWidth: typeof width === "number" ? `${width}px` : width,
        background: "var(--z-color-surface, #ffffff)",
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "var(--z-radius-md, 10px)",
        boxShadow: "0 8px 24px rgba(14,18,27,0.12), 0 2px 6px rgba(14,18,27,0.06)",
        padding: "var(--z-space-3, 0.75rem)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transform: open ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.97)",
        transformOrigin: "top left",
        transition: "opacity 150ms ease, transform 150ms ease",
        ...(side === "bottom" && { top: "calc(100% + 6px)" }),
        ...(side === "top" && { bottom: "calc(100% + 6px)" }),
        ...(side === "left" && { right: "calc(100% + 6px)", top: 0 }),
        ...(side === "right" && { left: "calc(100% + 6px)", top: 0 }),
        ...(align === "start" && side !== "left" && side !== "right" && { left: 0 }),
        ...(align === "end" && side !== "left" && side !== "right" && { right: 0 }),
        ...(align === "center" && side !== "left" && side !== "right" && {
            left: "50%",
            transform: `translateX(-50%) ${open ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.97)"}`
        })
    };

    return (
        <div
            ref={wrapRef}
            className={className}
            style={{ position: "relative", display: "inline-block", ...style }}
        >
            <span
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={id}
                onClick={toggle}
                style={{ cursor: "pointer", display: "inline-flex" }}
            >
                {trigger}
            </span>

            <div
                id={id}
                role="dialog"
                aria-modal="false"
                style={panelStyle}
            >
                {children}
            </div>
        </div>
    );
}
