import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const loginTrpcResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export type TRegisteredUser = z.infer<typeof userSchema>;
export type TLoginResponse = z.infer<typeof loginResponseSchema>;
export type TLoginTrpcResponse = z.infer<typeof loginTrpcResponseSchema>;
