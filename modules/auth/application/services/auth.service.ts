import { Injectable } from '@nestjs/common';
import { LocalLoginCommand } from 'modules/auth/domain/entities/localLoginCommand';

@Injectable()
export class AuthService {
  login(loginDto: LocalLoginCommand) {
    return 'This action adds a new auth';
  }

  logout() {
    return 'This action removes a #auth';
  }
}
