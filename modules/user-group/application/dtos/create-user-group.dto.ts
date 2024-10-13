import { ID } from '@common/types/baseModel';
import { IsMongoId } from 'class-validator';
import { UserGroup } from 'modules/user-group/domain/entities/user-group.entity';

export class CreateUserGroupDto extends UserGroup {
  @IsMongoId()
  groupId: ID;

  @IsMongoId()
  userId: ID;

  @IsMongoId()
  createdBy: ID;

  @IsMongoId()
  updatedBy: ID;
}
