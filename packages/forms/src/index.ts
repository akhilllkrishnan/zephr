/**
 * @zephrui/forms
 *
 * React-hook-form + Zod integration for Zephr components.
 *
 * Usage:
 * ```tsx
 * import { useZephrForm } from '@zephrui/forms';
 * import { z } from 'zod';
 *
 * const schema = z.object({
 *   email: z.string().email('Enter a valid email'),
 *   name: z.string().min(2, 'At least 2 characters'),
 * });
 *
 * function MyForm() {
 *   const { register, handleSubmit, errors } = useZephrForm(schema);
 *   return (
 *     <form onSubmit={handleSubmit((data) => console.log(data))}>
 *       <ZephrFormField label="Email" error={errors.email}>
 *         <input {...register('email')} />
 *       </ZephrFormField>
 *     </form>
 *   );
 * }
 * ```
 */

export * from "./useZephrForm";
export * from "./ZephrFormField";
export * from "./validators";
export type { ZephrFormSchema, ZephrFormErrors } from "./types";
