import { BaseModelWithTimestamps, ID } from '@common/types/baseModel';
import { Group } from '@modules/group/domain/entities/group.entity';
import { User } from '@modules/user/domain/entities/user.entity';

export class Wallet extends BaseModelWithTimestamps {
  symbolBase: string;
  symbolQuote: string;
  base: number;
  quote: number;
  buyPrice: number;
  sellPrice: number;
  owner: ID | User;
  group: ID | Group;
  permission: number[];
  symbol: string;
  isActive: boolean;
  isDeleted: boolean;
}
