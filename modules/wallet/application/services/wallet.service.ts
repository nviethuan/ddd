import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../../domain/dto/create-wallet.dto';
import { UpdateWalletDto } from '../../domain/dto/update-wallet.dto';
import { Wallet } from '@modules/wallet/domain/entities/wallet.entity';
import { Model } from 'mongoose';
import { CreateWallet } from '@modules/wallet/domain/value-objects/create-wallet';
import { DEFAULT_PERMISSIONS } from '@common/utils/permission';
import { AuthUser, Group } from '@common/types/app-request';
import { ById } from '@modules/wallet/domain/value-objects/get-wallet-by-id';
import { UpdateWallet } from '@modules/wallet/domain/value-objects/update-wallet';
import { DeleteWalletById } from '@modules/wallet/domain/value-objects/delete-wallet-by-id';

@Injectable()
export class WalletService {
  constructor(
    @Inject(Wallet)
    private readonly walletModel: Model<Wallet>,
  ) {}

  create(payload: CreateWallet) {
    const [defaultGroup] = payload.user.gs as Group[];

    const wallet = new this.walletModel({
      base: 0,
      quote: 0,
      symbolBase: payload.payload.symbolBase,
      symbolQuote: payload.payload.symbolQuote,
      sellPrice: 0,
      buyPrice: Infinity,
      owner: payload.user._id,
      group: defaultGroup._id,
      permission: DEFAULT_PERMISSIONS,
    });

    return wallet.save();
  }

  async findAll(user: AuthUser) {
    return this.walletModel.find({ owner: user._id });
  }

  findOne(query: ById) {
    return this.walletModel.findById({
      _id: query.toObjectID(),
      owner: query.user._id,
    });
  }

  update(command: UpdateWallet) {
    return this.walletModel.findOneAndUpdate(
      {
        _id: command.toObjectID(),
        owner: command.user._id,
      },
      command.payload,
    );
  }

  remove(command: DeleteWalletById) {
    return this.walletModel.findOneAndDelete({
      _id: command.toObjectID(),
      owner: command.user._id,
    });
  }
}
