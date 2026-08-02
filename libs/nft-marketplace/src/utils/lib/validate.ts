import { z } from "zod";

export const emailSchema = z
	.string()
	.trim()
	.toLowerCase()
	.email('Invalid email address');

export const changeEmailSchema = z.object({
	newEmail: emailSchema,
	currentPassword: z.string().min(1, 'Current password is required'),
});

export const passwordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters long')
	.max(72, 'Password is too long');

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, 'Current password is required'),
	newPassword: passwordSchema,
});

