import { UpdateWallet } from '@modules/wallet/domain/value-objects/update-wallet';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';

@CommandHandler(UpdateWallet)
export class UpdateWalletHandler implements ICommandHandler<UpdateWallet> {
  constructor(private readonly walletService: WalletService) {}

  async execute(command: UpdateWallet) {
    return this.walletService.update(command);
  }
}
