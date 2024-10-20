import { ID } from '@common/types/baseModel';
import { Group } from '@modules/group/domain/entities/group.entity';
import { User } from '@modules/user/domain/entities/user.entity';
import { IsMongoId } from 'class-validator';
import { UserGroup } from 'modules/user-group/domain/entities/user-group.entity';

export class CreateUserGroupDto extends UserGroup {
  @IsMongoId()
  declare group: ID | Group;

  @IsMongoId()
  declare user: ID | User;

  @IsMongoId()
  declare createdBy: ID | User;

  @IsMongoId()
  declare updatedBy: ID | User;
}
