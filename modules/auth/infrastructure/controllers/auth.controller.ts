import { Controller, Post, Body, Req, Inject, Get, Param, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginRequest } from 'modules/auth/application/dtos/local-login.dto';
import { LocalLoginCommand } from 'modules/auth/domain/entities/localLoginCommand';
import { User } from 'modules/user/domain/entities/user.entity';
import { Password } from 'modules/user/domain/value-objects/password';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(User)
    private readonly userModel: Model<User>,
  ) {}

  @Post('login')
  // @ApiBasicAuth('basic-authorization')
  // @ApiCookieAuth('')
  @ApiBearerAuth()
  @ApiSecurity('authorization')
  @ApiSecurity('apiKey')
  // @ApiOAuth2(['read:user', 'write:user'], 'oauth2')
  login(@Req() req: Request, @Body() localLoginDto: LoginRequest) {
    return this.commandBus.execute(new LocalLoginCommand(localLoginDto.email, localLoginDto.password));
  }

  @Post('signup')
  signup() {
    const password = new Password('123456');
    return this.userModel.create({
      email: 'test@test.com',
      password: password.hash(),
    });
  }

  @Get('profile/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'password', type: String })
  async profile(@Param('id') id: string, @Query('password') password: string) {
    const user: User = await this.userModel.findById(id);
    const passwordInput = new Password(password);
    const isPasswordValid = passwordInput.compare(user.password);

    return { user, isPasswordValid };
  }
}
