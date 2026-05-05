import { getTrademarksListInputSchema, trademarksListResponseSchema } from '../../schemas';
import { publicProcedure, router } from '../../trpc';

export const trademarkRouter = router({
  list: publicProcedure
    .input(getTrademarksListInputSchema)
    .output(trademarksListResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.trademarkService.getTrademarks(input);
    }),
});
