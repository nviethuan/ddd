import { Login } from '@modules/user/domain/value-objects/login';
import { LoginDto } from './../../domain/dtos/login.dto';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/guards/api-key/api-key.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @ApiSecurity('api_key')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Login with local strategy username/password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 403, description: 'User or password incorrect' })
  @ApiBody({
    type: LoginDto,
  })
  login(@Body() login: LoginDto) {
    return this.commandBus.execute(new Login(login.username, login.password));
  }
}
