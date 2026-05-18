import { Module } from '@nestjs/common';
import { LotService } from './lot.service';

@Module({
  providers: [LotService],
  exports: [LotService],
})
export class LotModule {}
