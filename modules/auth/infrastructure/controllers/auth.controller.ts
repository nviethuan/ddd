import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RefreshTokenRequestPayloadDto } from '@modules/auth/domain/dtos/refresh-token-request-payload.dto';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/infrastructure/guards/api-key/api-key.guard';

import { RefreshToken } from '@modules/auth/application/ports/refresh-token';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiSecurity('api_key')
  @UseGuards(ApiKeyGuard)
  @ApiBody({ type: RefreshTokenRequestPayloadDto })
  refreshToken(@Body('refreshToken') refreshToken: string) {
    const refreshTokenObject = new RefreshToken(refreshToken);

    return this.commandBus.execute(refreshTokenObject);
  }
}
