import { getLotDetailInputSchema, lotDetailResponseSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';

export const lotRouter = router({
  getDetail: publicProcedure
    .input(getLotDetailInputSchema)
    .output(lotDetailResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.lotService.getDetail(input);
    }),
});
