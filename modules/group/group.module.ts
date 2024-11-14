import { Module } from '@nestjs/common';
import { GroupController } from './infrastructure/controllers/group.controller';
import { GroupService } from './application/services/group.service';
import { CreateGroupCommandHandler } from './application/commands/create-group.command';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [GroupController],
  providers: [GroupService, CreateGroupCommandHandler],
  exports: [GroupService],
})
export class GroupModule {}
