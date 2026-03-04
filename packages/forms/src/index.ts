/**
 * @zephyr/forms
 *
 * React-hook-form + Zod integration for Zephyr components.
 *
 * Usage:
 * ```tsx
 * import { useZephyrForm } from '@zephyr/forms';
 * import { z } from 'zod';
 *
 * const schema = z.object({
 *   email: z.string().email('Enter a valid email'),
 *   name: z.string().min(2, 'At least 2 characters'),
 * });
 *
 * function MyForm() {
 *   const { register, handleSubmit, errors } = useZephyrForm(schema);
 *   return (
 *     <form onSubmit={handleSubmit((data) => console.log(data))}>
 *       <ZephyrFormField label="Email" error={errors.email}>
 *         <input {...register('email')} />
 *       </ZephyrFormField>
 *     </form>
 *   );
 * }
 * ```
 */

export * from "./useZephyrForm";
export * from "./ZephyrFormField";
export * from "./validators";
export type { ZephyrFormSchema, ZephyrFormErrors } from "./types";
