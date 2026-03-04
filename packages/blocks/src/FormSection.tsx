import { CSSProperties, ReactNode } from "react";

export interface FormSectionProps {
    headline?: string;
    description?: string;
    /** The form content (inputs, submit) */
    children: ReactNode;
    /** Align form in the section */
    align?: "center" | "left";
    /** Max width of the form container */
    maxWidth?: string | number;
    className?: string;
    style?: CSSProperties;
}

export function FormSection({
    headline,
    description,
    children,
    align = "center",
    maxWidth = 480,
    className,
    style
}: FormSectionProps) {
    const resolvedMax = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

    return (
        <section
            className={className}
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                background: "var(--z-color-surface, #ffffff)",
                display: "flex",
                flexDirection: "column",
                alignItems: align === "center" ? "center" : "flex-start",
                gap: "var(--z-space-7, 1.75rem)",
                ...style
            }}
        >
            {(headline || description) && (
                <div style={{ maxWidth: resolvedMax, width: "100%", textAlign: align }}>
                    {headline && (
                        <h2 style={{ margin: "0 0 var(--z-space-3, 0.75rem)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"], color: "var(--z-color-text, #171717)" }}>
                            {headline}
                        </h2>
                    )}
                    {description && (
                        <p style={{ margin: 0, color: "var(--z-color-muted, #737373)", lineHeight: 1.6 }}>
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div style={{ width: "100%", maxWidth: resolvedMax }}>
                {children}
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// SplitLayout — 50/50 auth-style page shell
// ---------------------------------------------------------------------------

export interface SplitLayoutProps {
    /** Left column content (e.g. form) */
    left: ReactNode;
    /** Right column content (e.g. media, illustration) */
    right: ReactNode;
    /** Which side the media panel is on */
    mediaPanel?: "left" | "right";
    /** Background color or gradient for the media panel */
    mediaPanelBackground?: string;
    className?: string;
    style?: CSSProperties;
}

export function SplitLayout({
    left,
    right,
    mediaPanel = "right",
    mediaPanelBackground = "linear-gradient(135deg, var(--z-color-primary, #335cff) 0%, #7c3aed 100%)",
    className,
    style
}: SplitLayoutProps) {
    const leftIsMedia = mediaPanel === "left";

    return (
        <div
            className={className}
            style={{
                display: "flex",
                minHeight: "100vh",
                ...style
            }}
        >
            {/* Content column */}
            <div
                style={{
                    flex: 1,
                    order: leftIsMedia ? 2 : 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "var(--z-space-10, 2.5rem) var(--z-space-8, 2rem)",
                    background: "var(--z-color-surface, #ffffff)"
                }}
            >
                <div style={{ width: "100%", maxWidth: 440 }}>
                    {left}
                </div>
            </div>

            {/* Media column — hidden on mobile via minWidth check in parent */}
            <div
                aria-hidden
                style={{
                    flex: 1,
                    order: leftIsMedia ? 1 : 2,
                    background: mediaPanelBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}
            >
                {right}
            </div>
        </div>
    );
}
