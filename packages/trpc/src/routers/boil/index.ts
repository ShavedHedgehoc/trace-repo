import {
  boilDetailResponseSchema,
  boilsListResponseSchema,
  boilsStatsResponseSchema,
  getBoilDetailSchema,
  getBoilsListInputSchema,
  getBoilsStatsInputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';

export const boilRouter = router({
  list: publicProcedure
    .input(getBoilsListInputSchema)
    .output(boilsListResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.boilService.getBoils(input);
    }),

  getStats: publicProcedure
    .input(getBoilsStatsInputSchema)
    .output(boilsStatsResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.boilService.getStats(input);
    }),

  getDetail: publicProcedure
    .input(getBoilDetailSchema)
    .output(boilDetailResponseSchema)
    .query(async ({ ctx, input }) => {
      return ctx.boilService.getDetail(input);
    }),
});
