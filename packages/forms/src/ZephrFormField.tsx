import { CSSProperties, ReactNode } from "react";

export interface ZephrFormFieldProps {
    label?: string;
    hint?: string;
    error?: string;
    /** id of the associated input control */
    htmlFor?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

/**
 * FormField wrapper that integrates cleanly with useZephrForm errors.
 *
 * @example
 * ```tsx
 * const { register, errors } = useZephrForm(schema);
 *
 * <ZephrFormField label="Email" error={errors.email} htmlFor="email">
 *   <input id="email" {...register('email')} />
 * </ZephrFormField>
 * ```
 */
export function ZephrFormField({
    label,
    hint,
    error,
    htmlFor,
    required = false,
    children,
    className,
    style
}: ZephrFormFieldProps) {
    const hasError = Boolean(error);

    return (
        <div
            className={className}
            style={{ display: "flex", flexDirection: "column", gap: "var(--z-space-1, 0.25rem)", ...style }}
        >
            {label && (
                <label
                    htmlFor={htmlFor}
                    style={{
                        fontSize: "var(--z-type-size-sm, 0.875rem)",
                        fontWeight: "var(--z-type-weight-medium, 500)" as CSSProperties["fontWeight"],
                        color: "var(--z-color-text, #171717)",
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--z-space-1, 0.25rem)"
                    }}
                >
                    {label}
                    {required && (
                        <span aria-hidden style={{ color: "var(--z-color-danger, #ef4444)" }}>
                            *
                        </span>
                    )}
                </label>
            )}

            {children}

            {hint && !hasError && (
                <p
                    style={{
                        margin: 0,
                        fontSize: "var(--z-type-size-xs, 0.75rem)",
                        color: "var(--z-color-muted, #737373)",
                        lineHeight: 1.5
                    }}
                >
                    {hint}
                </p>
            )}

            {hasError && (
                <p
                    role="alert"
                    aria-live="polite"
                    style={{
                        margin: 0,
                        fontSize: "var(--z-type-size-xs, 0.75rem)",
                        color: "var(--z-color-danger, #ef4444)",
                        lineHeight: 1.5
                    }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}
