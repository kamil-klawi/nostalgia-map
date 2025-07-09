import { z } from 'zod';

export const RegisterSchema = z.object({
    firstName: z
        .string()
        .min(2, {message: "Name must be at least 2 characters.",})
        .max(50, {message: "The name can be a maximum of 50 characters.",}),
    lastName: z
        .string()
        .min(2, {message: "Last name must be at least 2 characters.",})
        .max(80, {message: "The last name can be a maximum of 80 characters.",}),
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters.",})
        .regex(/[a-z]/, "Password must include a lowercase letter")
        .regex(/[A-Z]/, "Password must include an uppercase letter")
        .regex(/[0-9]/, "Password must include a number"),
    avatarUrl: z
        .string()
        .url()
        .optional(),
    bio: z
        .string()
        .optional()
});