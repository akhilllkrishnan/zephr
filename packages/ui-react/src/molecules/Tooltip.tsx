"use client";
import {
    CSSProperties,
    ReactNode,
    useEffect,
    useId,
    useRef,
    useState
} from "react";

export interface TooltipProps {
    /** The content shown inside the tooltip bubble */
    content: ReactNode;
    /** The element that triggers the tooltip */
    children: ReactNode;
    /** Placement relative to the trigger */
    side?: "top" | "bottom" | "left" | "right";
    /** Delay before showing (ms) */
    delayMs?: number;
    className?: string;
    style?: CSSProperties;
}

export function Tooltip({
    content,
    children,
    side = "top",
    delayMs = 400,
    className,
    style
}: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const id = useId();

    function show() {
        timerRef.current = setTimeout(() => setVisible(true), delayMs);
    }

    function hide() {
        if (timerRef.current) clearTimeout(timerRef.current);
        setVisible(false);
    }

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const tipStyle: CSSProperties = {
        position: "absolute",
        zIndex: 500,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        background: "var(--z-color-text, #171717)",
        color: "#ffffff",
        fontSize: "var(--z-type-size-xs, 0.75rem)",
        fontWeight: "var(--z-type-weight-medium, 500)" as CSSProperties["fontWeight"],
        lineHeight: 1.5,
        padding: "4px 8px",
        borderRadius: "var(--z-radius-sm, 4px)",
        boxShadow: "0 4px 12px rgba(14,18,27,0.14)",
        opacity: visible ? 1 : 0,
        transition: "opacity 120ms ease",
        ...(side === "top" && { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }),
        ...(side === "bottom" && { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }),
        ...(side === "left" && { right: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" }),
        ...(side === "right" && { left: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" })
    };

    // Small caret
    const caretStyle: CSSProperties = {
        position: "absolute",
        width: 6,
        height: 6,
        background: "var(--z-color-text, #171717)",
        ...(side === "top" && { top: "100%", left: "50%", transform: "translateX(-50%) rotate(45deg)", marginTop: -3 }),
        ...(side === "bottom" && { bottom: "100%", left: "50%", transform: "translateX(-50%) rotate(45deg)", marginBottom: -3 }),
        ...(side === "left" && { left: "100%", top: "50%", transform: "translateY(-50%) rotate(45deg)", marginLeft: -3 }),
        ...(side === "right" && { right: "100%", top: "50%", transform: "translateY(-50%) rotate(45deg)", marginRight: -3 })
    };

    return (
        <span
            className={className}
            style={{ position: "relative", display: "inline-flex", ...style }}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            <span aria-describedby={visible ? id : undefined} style={{ display: "inherit" }}>
                {children}
            </span>
            <span
                id={id}
                role="tooltip"
                aria-hidden={!visible}
                style={tipStyle}
            >
                <span aria-hidden style={caretStyle} />
                {content}
            </span>
        </span>
    );
}
