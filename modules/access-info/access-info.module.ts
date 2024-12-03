import { Module } from '@nestjs/common';
import { AccessInfoService } from './access-info.service';
import { AccessInfoController } from './access-info.controller';

@Module({
  controllers: [AccessInfoController],
  providers: [AccessInfoService],
})
export class AccessInfoModule {}
