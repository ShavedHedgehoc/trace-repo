import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const registerSchema = loginSchema.extend({
  name: z.string(),
});

export const authSchema = z.object({
  name: z.string().optional(),
  email: z.email(),
  password: z.string(),
});

export type TAuthInput = z.infer<typeof authSchema>;
export type TLoginInput = z.infer<typeof loginSchema>;
export type TRegisterInput = z.infer<typeof registerSchema>;
