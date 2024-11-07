import { PartialType } from '@nestjs/swagger';
import { CreatePasswordManagementDto } from './create-password-management.dto';

export class UpdatePasswordManagementDto extends PartialType(CreatePasswordManagementDto) {}
