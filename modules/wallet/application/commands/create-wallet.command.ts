import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';
import { CreateWallet } from '../ports/create-wallet';
@CommandHandler(CreateWallet)
export class CreateWalletHandler implements ICommandHandler<CreateWallet> {
  constructor(private readonly walletService: WalletService) {}

  async execute(command: CreateWallet) {
    return this.walletService.create(command);
  }
}
