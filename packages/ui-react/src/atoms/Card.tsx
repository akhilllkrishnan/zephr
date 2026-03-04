import { CSSProperties, ReactNode } from "react";

export interface CardProps {
    children: ReactNode;
    /** Surface elevation level */
    shadow?: "none" | "sm" | "md" | "lg";
    /** Inner spacing size */
    padding?: "none" | "sm" | "md" | "lg";
    /** Border treatment */
    variant?: "outlined" | "filled" | "elevated";
    /** Optionally override the border radius */
    radius?: string;
    className?: string;
    style?: CSSProperties;
    /** Click handler (renders as a button-like clickable card) */
    onClick?: () => void;
}

const shadowMap: Record<NonNullable<CardProps["shadow"]>, string> = {
    none: "none",
    sm: "var(--z-shadow-sm, 0 1px 3px rgba(14,18,27,0.08))",
    md: "var(--z-shadow-md, 0 4px 12px rgba(14,18,27,0.10))",
    lg: "var(--z-shadow-lg, 0 8px 24px rgba(14,18,27,0.14))"
};

const paddingMap: Record<NonNullable<CardProps["padding"]>, string> = {
    none: "0",
    sm: "var(--z-space-3, 0.75rem)",
    md: "var(--z-space-5, 1.25rem)",
    lg: "var(--z-space-7, 1.75rem)"
};

const variantStyles: Record<NonNullable<CardProps["variant"]>, CSSProperties> = {
    outlined: {
        background: "var(--z-color-surface, #ffffff)",
        border: "1px solid var(--z-color-border, #ebebeb)"
    },
    filled: {
        background: "var(--z-color-weak, #f7f7f7)",
        border: "none"
    },
    elevated: {
        background: "var(--z-color-surface, #ffffff)",
        border: "none"
    }
};

export function Card({
    children,
    shadow = "sm",
    padding = "md",
    variant = "outlined",
    radius,
    className,
    style,
    onClick
}: CardProps) {
    const baseStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        borderRadius: radius ?? "var(--z-radius-lg, 12px)",
        padding: paddingMap[padding],
        boxShadow: shadowMap[shadow],
        transition: "box-shadow 160ms ease",
        cursor: onClick ? "pointer" : undefined,
        ...variantStyles[variant],
        ...style
    };

    if (onClick) {
        return (
            <button
                type="button"
                className={className}
                style={{ ...baseStyle, textAlign: "left", fontFamily: "inherit", width: "100%" }}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

    return (
        <div className={className} style={baseStyle}>
            {children}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Card sub-components for composition
// ---------------------------------------------------------------------------

export function CardHeader({ children, style }: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div
            style={{
                paddingBottom: "var(--z-space-3, 0.75rem)",
                borderBottom: "1px solid var(--z-color-border, #ebebeb)",
                marginBottom: "var(--z-space-4, 1rem)",
                ...style
            }}
        >
            {children}
        </div>
    );
}

export function CardFooter({ children, style }: { children: ReactNode; style?: CSSProperties }) {
    return (
        <div
            style={{
                paddingTop: "var(--z-space-3, 0.75rem)",
                borderTop: "1px solid var(--z-color-border, #ebebeb)",
                marginTop: "auto",
                ...style
            }}
        >
            {children}
        </div>
    );
}
