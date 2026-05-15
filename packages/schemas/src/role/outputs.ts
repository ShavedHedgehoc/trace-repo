import { z } from 'zod';

export const rolesListRowSchema = z.object({
  roleId: z.number(),
  roleName: z.string(),
  roleAlias: z.string(),
});

export const rolesListResponseSchema = z.object({
  rows: z.array(rolesListRowSchema),
});

export type TRolesListRow = z.infer<typeof rolesListRowSchema>;
export type TRolesListResponse = z.infer<typeof rolesListResponseSchema>;
