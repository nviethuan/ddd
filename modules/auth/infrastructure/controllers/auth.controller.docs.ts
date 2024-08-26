import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthController } from './auth.controller';
import { LocalLoginDto } from 'modules/auth/application/dtos/local-login.dto';
import { Body, Controller, Post } from '@nestjs/common';

@ApiTags('Auth')
// @Controller('auth')
export class AuthControllerDocs extends AuthController {
  @ApiBody({ type: LocalLoginDto })
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() localLoginDto: LocalLoginDto): Promise<any> {
    return super.login(localLoginDto);
  }
}
