import { ById } from '@modules/wallet/domain/value-objects/get-wallet-by-id';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WalletService } from '../services/wallet.service';

@QueryHandler(ById)
export class GetWalletByIdHandler implements IQueryHandler<ById> {
  constructor(private readonly walletService: WalletService) {}

  async execute(query: ById) {
    return this.walletService.findOne(query);
  }
}
