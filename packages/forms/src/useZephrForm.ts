"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema, z } from "zod";

/**
 * Drop-in hook that wires react-hook-form with a Zod schema.
 * Returns the full form object plus a flattened `errors` map (field → message).
 *
 * @example
 * ```tsx
 * const schema = z.object({ email: z.string().email() });
 * const { register, handleSubmit, errors } = useZephrForm(schema);
 * ```
 */
export function useZephrForm<T extends ZodSchema>(schema: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form = useForm<any>({
        resolver: zodResolver(schema),
        mode: "onBlur"
    });

    const { formState } = form;

    /** Flat record of field-name → error message string */
    const errors = Object.fromEntries(
        Object.entries(formState.errors).map(([key, err]) => [
            key,
            (err as { message?: string })?.message ?? "Invalid value"
        ])
    ) as Partial<Record<keyof z.infer<T>, string>>;

    return {
        ...form,
        errors,
        isSubmitting: formState.isSubmitting,
        isSubmitted: formState.isSubmitted
    };
}
