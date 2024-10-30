import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../../domain/dto/create-wallet.dto';
import { UpdateWalletDto } from '../../domain/dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor() {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  async findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
