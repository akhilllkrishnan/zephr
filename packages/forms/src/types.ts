import type { ZodSchema, ZodTypeAny, z } from "zod";
import type { UseFormReturn } from "react-hook-form";

/** Inferred Zod schema type */
export type ZephyrFormSchema<T extends ZodTypeAny> = z.infer<T>;

/** Flat record of field-level error messages */
export type ZephyrFormErrors<T extends ZodSchema> = Partial<
    Record<keyof z.infer<T>, string>
>;

/** Return type from useZephyrForm */
export interface ZephyrFormReturn<T extends ZodSchema>
    extends Omit<UseFormReturn<z.infer<T>>, "formState"> {
    /** Flat error message map keyed by field name */
    errors: ZephyrFormErrors<T>;
    /** Whether the form is currently submitting */
    isSubmitting: boolean;
    /** Whether the form has been submitted */
    isSubmitted: boolean;
}
