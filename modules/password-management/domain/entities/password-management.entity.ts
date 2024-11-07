import { CommonModel, ID } from '@common/types/baseModel';

export class PasswordManagement extends CommonModel {
  userId: ID;
  username: string;
  password: string;
  secretKey: string;
  publicKey: string;
  site: string;
}
