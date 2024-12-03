import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Resource } from '../entities/resource.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto extends Resource {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:
      'The name of the resource, must be unique, lowercase and only contain letters, numbers and underscores',
  })
  declare name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The label of the resource, displayed in the UI',
  })
  declare label: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the resource',
  })
  declare description: string;
}
