import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';
import { ById } from '../ports/get-wallet-by-id';

@QueryHandler(ById)
export class GetWalletByIdHandler implements IQueryHandler<ById> {
  constructor(private readonly walletService: WalletService) {}

  async execute(query: ById) {
    return this.walletService.findOne(query);
  }
}
