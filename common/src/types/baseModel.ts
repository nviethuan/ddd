import { Types } from 'mongoose';

export type ID = Types.ObjectId;

export interface IBaseModel {
  _id?: ID;
}

export interface IBaseModelWithTimestamps extends IBaseModel {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommonModel extends IBaseModelWithTimestamps {
  updatedBy?: ID | any;
  createdBy?: ID | any;
  deletedAt?: Date;
  deletedBy?: ID | any;
  groupId?: ID | any;
  permissions?: string;
}
