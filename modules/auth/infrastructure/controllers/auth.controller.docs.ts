import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthController } from './auth.controller';
import { LoginRequest } from 'modules/auth/application/dtos/local-login.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Auth0Guard } from '@common/guards/auth0/auth0.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthControllerDocs extends AuthController {
  @Post('login')
  @UseGuards(Auth0Guard)
  async login(@Body() loginRequest: LoginRequest) {
    return super.login(loginRequest);
  }
}
