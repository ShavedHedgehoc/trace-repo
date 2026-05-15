import {
  cellsContainListResponseSchema,
  deleteCellsContainRecordSchema,
  getCellsContainListInputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';
import { TRPCError } from '@trpc/server';

export const cellRouter = router({
  list: publicProcedure
    .input(getCellsContainListInputSchema)
    .output(cellsContainListResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.cellService.getCellsContain(input);
    }),
  delete: publicProcedure.input(deleteCellsContainRecordSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.cellService.deleteCellsContain(input);
    } catch (error: any) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message || 'Ошибка удаления',
        cause: error,
      });
    }
  }),
});
