import { PartialType } from '@nestjs/swagger';
import { CreateAccessInfoDto } from './create-access-info.dto';

export class UpdateAccessInfoDto extends PartialType(CreateAccessInfoDto) {}
