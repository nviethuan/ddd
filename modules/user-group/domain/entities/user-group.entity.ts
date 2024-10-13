import { ICommonModel, ID } from '@common/types/baseModel';

export class UserGroup implements ICommonModel {
  _id?: ID;
  userId: ID;
  groupId: ID;

  createdAt?: Date;
  createdBy?: ID;
  updatedAt?: Date;
  updatedBy?: ID;
}
