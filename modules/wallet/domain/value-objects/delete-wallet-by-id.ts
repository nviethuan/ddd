import { AuthUser } from '@common/types/app-request';
import { ById } from './get-wallet-by-id';

export class DeleteWalletById extends ById {
  constructor(
    public readonly id: string,
    public readonly user: AuthUser,
  ) {
    super(id, user);
  }
}
