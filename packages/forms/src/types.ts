import type { ZodSchema, ZodTypeAny, z } from "zod";
import type { UseFormReturn } from "react-hook-form";

/** Inferred Zod schema type */
export type ZephrFormSchema<T extends ZodTypeAny> = z.infer<T>;

/** Flat record of field-level error messages */
export type ZephrFormErrors<T extends ZodSchema> = Partial<
    Record<keyof z.infer<T>, string>
>;

/** Return type from useZephrForm */
export interface ZephrFormReturn<T extends ZodSchema>
    extends Omit<UseFormReturn<z.infer<T>>, "formState"> {
    /** Flat error message map keyed by field name */
    errors: ZephrFormErrors<T>;
    /** Whether the form is currently submitting */
    isSubmitting: boolean;
    /** Whether the form has been submitted */
    isSubmitted: boolean;
}
