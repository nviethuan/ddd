import { IsLowercase, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Group } from 'modules/group/domain/entities/group.entity';

export class CreateGroupDto extends Group {
  @IsString()
  @IsNotEmpty()
  declare displayName: string;

  @IsString()
  @IsNotEmpty()
  @IsLowercase({ message: 'Name must be lowercase' })
  declare name: string;

  @IsString()
  @IsOptional()
  declare description?: string;
}
