import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsLowercase, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Group } from 'modules/group/domain/entities/group.entity';

export class CreateGroupDto extends Group {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Display name of the group' })
  declare displayName: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase({ message: 'Name must be lowercase' })
  @ApiProperty({ description: 'Name of the group' })
  declare name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Description of the group' })
  declare description?: string;

  @IsBoolean()
  @IsOptional()
  declare hidden?: boolean;
}
