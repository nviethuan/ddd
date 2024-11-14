import { CreateGroupDto } from '@modules/group/domain/dtos/create-group.dto';

export class CreateGroup {
  constructor(public readonly payload: CreateGroupDto) {}
}
