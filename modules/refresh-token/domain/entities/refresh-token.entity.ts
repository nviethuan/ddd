import { BaseModelWithTimestamps, ID } from '@common/types/baseModel';
import { User } from '@modules/user/domain/entities/user.entity';

export class RefreshToken extends BaseModelWithTimestamps {
  uid: ID | User;
  refreshToken: string;
}
