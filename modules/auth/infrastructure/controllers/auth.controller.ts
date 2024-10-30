import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RefreshTokenRequestPayloadDto } from '@modules/auth/domain/dtos/refresh-token-request-payload.dto';
import { RefreshToken } from '@modules/auth/domain/object-values/refresh-token';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@common/infrastructure/guards/api-key/api-key.guard';

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
