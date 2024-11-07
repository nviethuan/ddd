import { CommonModel, ID } from '@common/types/baseModel';
import { User } from '@modules/user/domain/entities/user.entity';

/**
 * @description Account management by user
 */
export class Account extends CommonModel {
  userId: ID | User;
  name: string;
  accessKey: string;
  secretKey: string;
  exchange: string;
  isActive: boolean;
  isDeleted: boolean;
}
