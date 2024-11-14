import { AuthUser } from '@common/types/app-request';
import { CreateWalletDto } from '../dto/create-wallet.dto';

export class CreateWallet {
  constructor(
    public readonly payload: CreateWalletDto,
    public readonly user: AuthUser,
  ) {}
}
