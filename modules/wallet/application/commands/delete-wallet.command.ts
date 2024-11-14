import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';
import { DeleteWalletById } from '../ports/delete-wallet-by-id';

@CommandHandler(DeleteWalletById)
export class DeleteWalletHandler implements ICommandHandler<DeleteWalletById> {
  constructor(private readonly walletService: WalletService) {}

  async execute(command: DeleteWalletById) {
    return this.walletService.remove(command);
  }
}
