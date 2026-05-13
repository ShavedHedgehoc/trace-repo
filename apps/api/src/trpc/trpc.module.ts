import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { TrademarkModule } from '../trademark/trademark.module';
import { BoilModule } from '../boil/boil.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [BoilModule, TrademarkModule, AuthModule],
  providers: [
    {
      provide: 'TRPC_SERVICE',
      useClass: TrpcService,
    },
  ],
  controllers: [TrpcController],
})
export class TrpcModule {}
