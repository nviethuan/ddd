import { CommonModel, ID } from '@common/types/baseModel';
import { Group } from '@modules/group/domain/entities/group.entity';
import { User } from '@modules/user/domain/entities/user.entity';

export class UserGroup implements CommonModel {
  _id?: ID;
  user: ID | User;
  group: ID | Group;

  createdAt?: Date;
  createdBy?: ID | User;
  updatedAt?: Date;
  updatedBy?: ID | User;
}
