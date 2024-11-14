import { PartialType } from '@nestjs/swagger';
import { CreateAuthAppDto } from './create-auth-app.dto';

export class UpdateAuthAppDto extends PartialType(CreateAuthAppDto) {}
