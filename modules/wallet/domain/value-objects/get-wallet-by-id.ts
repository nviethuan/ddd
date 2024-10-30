import { AuthUser } from '@common/types/app-request';
import { Types } from 'mongoose';

export class ById {
  constructor(
    public readonly id: string,
    public readonly user: AuthUser,
  ) {}

  toObjectID(): Types.ObjectId {
    return new Types.ObjectId(this.id);
  }
}
