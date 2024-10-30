import { CreateWallet } from '@modules/wallet/domain/value-objects/create-wallet';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';

@CommandHandler(CreateWallet)
export class CreateWalletHandler implements ICommandHandler<CreateWallet> {
  constructor(private readonly walletService: WalletService) {}

  async execute(command: CreateWallet) {
    return this.walletService.create(command);
  }
}
