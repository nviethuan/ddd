import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LocalLoginDto } from 'modules/auth/application/dtos/local-login.dto';
import { LocalLoginCommand } from 'modules/auth/domain/entities/localLoginCommand';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  login(@Body() localLoginDto: LocalLoginDto) {
    return this.commandBus.execute(new LocalLoginCommand(localLoginDto.email, localLoginDto.password));
  }
}
