import { Module } from '@nestjs/common';
import { TrademarkService } from './trademark.service';

@Module({
  providers: [TrademarkService],
  exports: [TrademarkService],
})
export class TrademarkModule {}
