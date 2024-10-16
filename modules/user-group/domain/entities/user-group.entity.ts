import { CommonModel, ID } from '@common/types/baseModel';

export class UserGroup implements CommonModel {
  _id?: ID;
  userId: ID;
  groupId: ID;

  createdAt?: Date;
  createdBy?: ID;
  updatedAt?: Date;
  updatedBy?: ID;
}
