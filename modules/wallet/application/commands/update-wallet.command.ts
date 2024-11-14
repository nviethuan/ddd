import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';
import { UpdateWallet } from '../ports/update-wallet';

@CommandHandler(UpdateWallet)
export class UpdateWalletHandler implements ICommandHandler<UpdateWallet> {
  constructor(private readonly walletService: WalletService) {}

  async execute(command: UpdateWallet) {
    return this.walletService.update(command);
  }
}
