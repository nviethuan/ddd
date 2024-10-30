import { DeleteWalletById } from '@modules/wallet/domain/value-objects/delete-wallet-by-id';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';

@CommandHandler(DeleteWalletById)
export class DeleteWalletHandler implements ICommandHandler<DeleteWalletById> {
  constructor(private readonly walletService: WalletService) {}

  async execute(command: DeleteWalletById) {
    return this.walletService.remove(command);
  }
}
