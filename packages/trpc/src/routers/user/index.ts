import {
  deleteUserRecordSchema,
  getUsersListInputSchema,
  updateUseRolesSchema,
  usersListResponseSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  list: publicProcedure
    .input(getUsersListInputSchema)
    .output(usersListResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.userService.getUsers(input);
    }),

  delete: publicProcedure.input(deleteUserRecordSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.userService.deleteUser(input);
    } catch (error: any) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message || 'Ошибка удаления',
        cause: error,
      });
    }
  }),
  updateRoles: publicProcedure.input(updateUseRolesSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.userService.updateUserRoles(input);
    } catch (error: any) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message || 'Ошибка обновления',
        cause: error,
      });
    }
  }),
});
