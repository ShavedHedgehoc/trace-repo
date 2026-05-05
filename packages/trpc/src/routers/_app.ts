// # Main router
import { router } from '../trpc';
import { boilRouter } from './boil';

import { trademarkRouter } from './trademark';

export const appRouter = router({
  boil: boilRouter,
  trademark: trademarkRouter,
});

export type AppRouter = typeof appRouter;
