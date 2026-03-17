import { CSSProperties, ReactNode } from "react";

export interface DividerProps {
    /** Axis the divider spans */
    orientation?: "horizontal" | "vertical";
    /** Optional center label */
    label?: ReactNode;
    /** Thickness in px */
    thickness?: number;
    className?: string;
    style?: CSSProperties;
}

export function Divider({
    orientation = "horizontal",
    label,
    thickness = 1,
    className,
    style
}: DividerProps) {
    const isVertical = orientation === "vertical";

    if (label) {
        return (
            <div
                role="separator"
                className={className}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--z-space-3, 0.75rem)",
                    width: "100%",
                    ...style
                }}
            >
                <span
                    aria-hidden
                    style={{
                        flex: 1,
                        height: thickness,
                        background: "var(--z-color-border, #ebebeb)"
                    }}
                />
                <span
                    style={{
                        fontSize: "11px",
                        lineHeight: "16px",
                        color: "var(--z-color-text400, #a3a3a3)",
                        whiteSpace: "nowrap",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.22px"
                    }}
                >
                    {label}
                </span>
                <span
                    aria-hidden
                    style={{
                        flex: 1,
                        height: thickness,
                        background: "var(--z-color-border, #ebebeb)"
                    }}
                />
            </div>
        );
    }

    return (
        <div
            role="separator"
            className={className}
            aria-orientation={orientation}
            style={
                isVertical
                    ? {
                        display: "inline-block",
                        width: thickness,
                        alignSelf: "stretch",
                        background: "var(--z-color-border, #ebebeb)",
                        flexShrink: 0,
                        ...style
                    }
                    : {
                        width: "100%",
                        height: thickness,
                        background: "var(--z-color-border, #ebebeb)",
                        flexShrink: 0,
                        ...style
                    }
            }
        />
    );
}
