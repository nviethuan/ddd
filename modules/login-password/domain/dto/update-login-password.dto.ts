import { PartialType } from '@nestjs/swagger';
import { CreateLoginPasswordDto } from './create-login-password.dto';

export class UpdateLoginPasswordDto extends PartialType(CreateLoginPasswordDto) {}
