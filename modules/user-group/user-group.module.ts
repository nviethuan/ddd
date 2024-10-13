import { Module } from '@nestjs/common';
import { UserGroupController } from './infrastructure/controllers/user-group.controller';
import { UserGroupService } from './application/services/user-group.service';
import { MongodbModule } from '@libs/mongodb';
import { userGroupSchema } from './infrastructure/schema/user-group.schema';
import { UserGroup } from './domain/entities/user-group.entity';

@Module({
  controllers: [UserGroupController],
  providers: [UserGroupService],
  exports: [UserGroupService],
})
export class UserGroupModule {}
