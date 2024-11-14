import { CreateGroup } from '@modules/group/application/ports/create-group';
import { Injectable } from '@nestjs/common';
import { GroupService } from 'modules/group/application/services/group.service';

@Injectable()
export class GroupCliService {
  constructor(private readonly groupService: GroupService) {}

  async createGroup(name: string, description: string) {
    return this.groupService.create(new CreateGroup({ name, description, displayName: name }));
  }

  async deleteGroup(name: string) {
    return this.groupService.deleteByName(name);
  }
}
