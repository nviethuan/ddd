import { CommonModel, ID } from '@common/types/baseModel';
import { User } from 'modules/user/domain/entities/user.entity';

export class Group implements CommonModel {
  _id?: ID;
  displayName: string;
  name: string;
  description?: string;

  createdAt?: Date;
  createdBy?: ID | User;

  updatedAt?: Date;
  updatedBy?: ID | User;
}
