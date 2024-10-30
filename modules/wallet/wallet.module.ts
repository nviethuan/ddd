import { Module } from '@nestjs/common';
import { WalletService } from './application/services/wallet.service';
import { WalletController } from './infrastructure/wallet.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllWalletsHandler } from './application/queries/get-all-wallets.query';
import { CreateWalletHandler } from './application/commands/create-wallet.command';
import { GetWalletByIdHandler } from './application/queries/get-by-id.query';
import { UpdateWalletHandler } from './application/commands/update-wallet.command';
import { DeleteWalletHandler } from './application/commands/delete-wallet.command';

@Module({
  imports: [CqrsModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    // Queries
    GetAllWalletsHandler,
    GetWalletByIdHandler,
    // Commands
    CreateWalletHandler,
    UpdateWalletHandler,
    DeleteWalletHandler,
  ],
})
export class WalletModule {}
