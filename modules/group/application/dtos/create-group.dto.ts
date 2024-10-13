import { ID } from '@common/types/baseModel';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Group } from 'modules/group/domain/entities/group.entity';

export class CreateGroupDto extends Group {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  createdBy?: ID;

  @IsMongoId()
  @IsOptional()
  updatedBy?: ID;
}
