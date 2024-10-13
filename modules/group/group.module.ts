import { Module } from '@nestjs/common';
import { GroupController } from './infrastructure/controllers/group.controller';
import { GroupService } from './application/services/group.service';
import { Group } from './domain/entities/group.entity';
import { groupSchema } from './infrastructure/schema/group.schema';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
