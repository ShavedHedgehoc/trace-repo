import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { ITrpcContext } from '@repo/trpc';
import { TrademarkService } from '../trademark/trademark.service';
import { BoilService } from '../boil/boil.service';

@Injectable()
export class TrpcService {
  constructor(

    @Inject(forwardRef(() => BoilService)) private readonly boilService: BoilService,
    @Inject(forwardRef(() => TrademarkService)) private readonly trademarkSevice: TrademarkService,

  ) { }

  createContext(_opts: trpcExpress.CreateExpressContextOptions): ITrpcContext {
    return {
      trademarkService: this.trademarkSevice,
      boilServise: this.boilService
    };
  }
}
