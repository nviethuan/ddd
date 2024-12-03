import { BaseModelWithTimestamps, ID } from '@common/types/baseModel';

export class User implements BaseModelWithTimestamps {
  _id: ID;
  username: string;
  fName: string;
  lName: string;
  locale: string;
  isActive: boolean;
  deletedAt?: Date;
  deletedBy?: ID | User;
  createdAt?: Date;
  updatedAt?: Date;
  gs?: string;
}
