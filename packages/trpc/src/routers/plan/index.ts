import { deleteBoilPlanSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';
import { TRPCError } from '@trpc/server';

export const planRouter = router({
  delete: publicProcedure.input(deleteBoilPlanSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.planService.deletePlan(input);
    } catch (error: any) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message || 'Ошибка удаления',
        cause: error,
      });
    }
  }),
});
