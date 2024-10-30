import { AuthUser } from '@common/types/app-request';

export class GetAllWallets {
  constructor(public readonly user: AuthUser) {}
}
