import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequestPayloadDto {
  @ApiProperty()
  refreshToken: string;
}
