import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_PERMISSIONS } from '@common/utils/permission';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @IsOptional()
  @IsArray({ each: true })
  @IsNumber()
  @ApiProperty({
    type: [Number],
    default: DEFAULT_PERMISSIONS,
  })
  permission?: number[];
}
