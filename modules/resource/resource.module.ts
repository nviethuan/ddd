import { Module } from '@nestjs/common';
import { ResourceService } from './application/services/resource.service';
import { ResourceController } from './infrastructure/resource.controller';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
