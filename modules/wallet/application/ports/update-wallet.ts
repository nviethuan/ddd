import { AuthUser } from '@common/types/app-request';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { ById } from './get-wallet-by-id';

export class UpdateWallet extends ById {
  constructor(
    public readonly id: string,
    public readonly user: AuthUser,
    public readonly payload: UpdateWalletDto,
  ) {
    super(id, user);
  }
}
