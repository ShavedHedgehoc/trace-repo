// # Main router
import { router } from '../trpc';

import { trademarkRouter } from './trademark';

export const appRouter = router({
  trademark: trademarkRouter,
});

export type AppRouter = typeof appRouter;
