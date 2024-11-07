import { Injectable } from '@nestjs/common';
import { CreateLoginPasswordDto } from '../../domain/dto/create-login-password.dto';
import { UpdateLoginPasswordDto } from '../../domain/dto/update-login-password.dto';

@Injectable()
export class LoginPasswordService {
  create(createLoginPasswordDto: CreateLoginPasswordDto) {
    return 'This action adds a new loginPassword';
  }

  findAll() {
    return `This action returns all loginPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loginPassword`;
  }

  update(id: number, updateLoginPasswordDto: UpdateLoginPasswordDto) {
    return `This action updates a #${id} loginPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} loginPassword`;
  }
}
