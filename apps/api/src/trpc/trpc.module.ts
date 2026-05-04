import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { TrademarkModule } from 'src/trademark/trademark.module';
// import { EmployeeAppModule } from '../employee.app/employee.app.module';

@Module({
  imports: [
    // EmployeeAppModule,
    TrademarkModule
  ],
  providers: [
    {
      provide: 'TRPC_SERVICE',
      useClass: TrpcService,
    },
  ],
  controllers: [TrpcController],
})
export class TrpcModule { }
