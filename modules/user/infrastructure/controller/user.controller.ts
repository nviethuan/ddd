import { Login } from '@modules/user/application/ports/login';
import { LoginDto } from './../../domain/dtos/login.dto';
import { Controller, Post, Body, UseGuards, Get, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/infrastructure/guards/api-key/api-key.guard';
import { User } from '@modules/user/domain/entities/user.entity';
import { Auth0Guard } from '@common/infrastructure/guards/auth0/auth0.guard';
import { Action, Policies } from '@app/casl/decorators/policies/policies.decorator';
import { PoliciesGuard } from '@app/casl/guards/policies/policies.guard';

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
  @HttpCode(HttpStatus.OK)
  login(@Body() login: LoginDto) {
    return this.commandBus.execute(new Login(login.username, login.password));
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Policies([Action.Read, User])
  @UseGuards(Auth0Guard, PoliciesGuard)
  me(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
