// # Main router
import { router } from '../trpc';
import { authRouter } from './auth';
import { boilRouter } from './boil';
import { cellRouter } from './cell';
import { lotRouter } from './lot';
import { materialRouter } from './material';
import { planRouter } from './plan';
import { roleRouter } from './role';
import { trademarkRouter } from './trademark';
import { userRouter } from './user';

export const appRouter = router({
  boil: boilRouter,
  trademark: trademarkRouter,
  auth: authRouter,
  cell: cellRouter,
  material: materialRouter,
  user: userRouter,
  role: roleRouter,
  lot: lotRouter,
  plan: planRouter,
});

export type AppRouter = typeof appRouter;
