import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';
import { GetAllWallets } from '../ports/get-all-wallets';

@QueryHandler(GetAllWallets)
export class GetAllWalletsHandler implements IQueryHandler<GetAllWallets> {
  constructor(private readonly walletService: WalletService) {}

  async execute(query: GetAllWallets) {
    return this.walletService.findAll(query.user);
  }
}
