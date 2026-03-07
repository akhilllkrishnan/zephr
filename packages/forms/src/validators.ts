import { z } from "zod";

/**
 * Common pre-built Zod validators for Zephr forms.
 */
export const zv = {
    /** Non-empty string with optional min/max length */
    text: (opts?: { min?: number; max?: number; label?: string }) => {
        const label = opts?.label ?? "This field";
        let base = z.string().trim();
        if (opts?.min !== undefined) {
            base = base.min(opts.min, `${label} must be at least ${opts.min} characters`);
        }
        if (opts?.max !== undefined) {
            base = base.max(opts.max, `${label} must be at most ${opts.max} characters`);
        }
        return base.min(1, `${label} is required`);
    },

    /** Email address */
    email: (label = "Email") =>
        z.string().trim().email(`${label} must be a valid email address`),

    /** URL */
    url: (label = "URL") =>
        z.string().trim().url(`${label} must be a valid URL`),

    /** Positive integer */
    positiveInt: (label = "Value") =>
        z
            .number({ invalid_type_error: `${label} must be a number` })
            .int(`${label} must be a whole number`)
            .positive(`${label} must be greater than 0`),

    /** Optional string (empty string → undefined) */
    optionalText: () =>
        z.string().trim().optional().transform((v) => v || undefined),

    /** Checkbox / boolean must be true (for "I agree") */
    mustAccept: (msg = "You must accept this to continue") =>
        z.literal(true, { errorMap: () => ({ message: msg }) }),

    /** Enum from an array of string literals */
    enumOf: <T extends string>(values: readonly [T, ...T[]], label = "Option") =>
        z.enum(values, {
            errorMap: () => ({ message: `${label} must be one of: ${values.join(", ")}` })
        })
};
