import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters.",})
        .regex(/[a-z]/, "Password must include a lowercase letter")
        .regex(/[A-Z]/, "Password must include an uppercase letter")
        .regex(/[0-9]/, "Password must include a number"),
});