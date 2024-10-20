import { Login } from '@modules/user/domain/value-objects/login';
import { LoginDto } from './../../domain/dtos/login.dto';
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/guards/api-key/api-key.guard';
import { User } from '@modules/user/domain/entities/user.entity';
import { Auth0Guard } from '@common/guards/auth0/auth0.guard';

@ApiTags('User')
@Controller('users')
@ApiSecurity('api_key')
@UseGuards(ApiKeyGuard)
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with local strategy username/password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 403, description: 'User or password incorrect' })
  @ApiBody({
    type: LoginDto,
  })
  login(@Body() login: LoginDto) {
    return this.commandBus.execute(new Login(login.username, login.password));
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(Auth0Guard)
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  me(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
