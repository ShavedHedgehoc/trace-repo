import { z } from 'zod';

export const usersRoleSchema = z.object({
  RolePK: z.number(),
  RoleName: z.string(),
  RoleAlias: z.string(),
});

export const usersListRowSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  userEmail: z.string(),
  roles: z.array(usersRoleSchema),
});

export const usersListResponseSchema = z.object({
  rows: z.array(usersListRowSchema),
  total: z.number(),
  totalPages: z.number(),
});

export type TUserRole = z.infer<typeof usersRoleSchema>;
export type TUsersListRow = z.infer<typeof usersListRowSchema>;
export type TUsersListResponse = z.infer<typeof usersListResponseSchema>;
