import { z } from 'zod';

export const VerifySchema = z.object({
    email: z
        .string()
        .email(),
    code: z
        .string()
        .min(6, "Your one-time password must be 6 characters.")
});