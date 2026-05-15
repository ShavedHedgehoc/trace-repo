import { publicProcedure, router } from '../../trpc';
import { rolesListResponseSchema } from '@repo/schemas';

export const roleRouter = router({
  list: publicProcedure.output(rolesListResponseSchema).query(async ({ ctx }) => {
    return ctx.roleService.getRoles();
  }),
});
