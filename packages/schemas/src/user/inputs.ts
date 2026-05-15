import { z } from 'zod';

export const getUsersListInputSchema = z.object({
  name: z.string().default(''),
  email: z.string().default(''),
  roles: z.array(z.number()).default([]),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const deleteUserRecordSchema = z.object({
  userId: z.number(),
});

export const updateUseRolesSchema = z.object({
  userId: z.number(),
  roles: z.array(z.number()),
});

export type TGetUsersListInput = z.infer<typeof getUsersListInputSchema>;
export type TDeleteUserRecordInput = z.infer<typeof deleteUserRecordSchema>;
export type TUpdateUserRolesInput = z.infer<typeof updateUseRolesSchema>;
