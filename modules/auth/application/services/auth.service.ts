import { Injectable } from '@nestjs/common';
import { LocalLoginCommand } from 'modules/auth/domain/entities/localLoginCommand';

@Injectable()
export class AuthService {
  login(loginDto: LocalLoginCommand) {
    return {
      ping: 'pong',
    };
  }

  logout() {
    return 'This action removes a #auth';
  }
}
