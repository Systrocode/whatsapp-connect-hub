import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be less than 72 characters'),
});

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be less than 72 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
  businessName: z
    .string()
    .trim()
    .min(1, 'Business name is required')
    .max(100, 'Business name must be less than 100 characters'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters'),
}).refine((data) => {
  const password = data.password.toLowerCase();
  const name = data.fullName.toLowerCase();
  const business = data.businessName.toLowerCase();
  const emailName = data.email.split('@')[0].toLowerCase();

  return !password.includes(name) && !password.includes(business) && !password.includes(emailName);
}, {
  message: "Password cannot contain your name, business name, or email",
  path: ["password"],
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be less than 72 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;