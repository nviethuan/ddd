import { Injectable } from '@nestjs/common';
import { CreateAuthAppDto } from '../dtos/create-auth-app.dto';
import { UpdateAuthAppDto } from '../dtos/update-auth-app.dto';

@Injectable()
export class AuthAppService {
  create(createAuthAppDto: CreateAuthAppDto) {
    return 'This action adds a new authApp';
  }

  findAll() {
    return `This action returns all authApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authApp`;
  }

  update(id: number, updateAuthAppDto: UpdateAuthAppDto) {
    return `This action updates a #${id} authApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} authApp`;
  }
}
