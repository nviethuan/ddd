import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Wallet } from '../entities/wallet.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto extends Wallet {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  declare symbolBase: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  declare symbolQuote: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  declare base: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  declare quote: number;

  @IsOptional()
  @ApiProperty({
    default: Infinity,
  })
  buyPrice: number = Infinity;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  declare sellPrice: number;
}
