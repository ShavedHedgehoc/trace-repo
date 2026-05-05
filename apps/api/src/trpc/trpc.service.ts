import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { ITrpcContext } from '@repo/trpc';
// import { EmployeeAppService } from '../employee.app/employee.app.service';
import { TrademarkService } from '../trademark/trademark.service';

@Injectable()
export class TrpcService {
  constructor(
    @Inject(forwardRef(() => TrademarkService))

    // private readonly employeeAppService: EmployeeAppService,
    private readonly trademarkSevice: TrademarkService,
  ) {}

  createContext(_opts: trpcExpress.CreateExpressContextOptions): ITrpcContext {
    return {
      trademarkService: this.trademarkSevice,
      // appEmployeeService: this.employeeAppService,
    };
  }
}
