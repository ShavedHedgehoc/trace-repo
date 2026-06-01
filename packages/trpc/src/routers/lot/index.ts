import {
  getLotDetailInputSchema,
  lotDetailResponseSchema,
  lotDetailXLSXResponseSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';

export const lotRouter = router({
  getDetail: publicProcedure
    .input(getLotDetailInputSchema)
    .output(lotDetailResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.lotService.getDetail(input);
    }),
  getDetailXLSX: publicProcedure
    .input(getLotDetailInputSchema)
    .output(lotDetailXLSXResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.lotService.getDetailXLSX(input);
    }),
});
