import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    default: false,
  })
  isDeleted?: boolean;
}
