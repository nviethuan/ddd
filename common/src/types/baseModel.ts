import { Types } from 'mongoose';

export type ID = Types.ObjectId;

export class BaseModel {
  _id?: ID;
}

export class BaseModelWithTimestamps extends BaseModel {
  createdAt?: Date;
  updatedAt?: Date;
}

export class CommonModel extends BaseModelWithTimestamps {
  updatedBy?: ID | any;
  createdBy?: ID | any;
  deletedAt?: Date;
  deletedBy?: ID | any;
  groupId?: ID | any;
  permissions?: string;
}
