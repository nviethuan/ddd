import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { ForceChangePasswordDto } from 'apps/cli/src/infrastructure/commands/user/force-change-password.cmd';
import { CreateGroupDto } from 'modules/group/application/dtos/create-group.dto';
import { GroupService } from 'modules/group/application/services/group.service';
import { CreateUserGroupDto } from 'modules/user-group/application/dtos/create-user-group.dto';
import { UserGroupService } from 'modules/user-group/application/services/user-group.service';
import { UserService } from 'modules/user/application/services/user.service';
import { Password } from 'modules/user/domain/value-objects/password';

@Injectable()
export class UserCliService {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly userGroupService: UserGroupService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const groupData: CreateGroupDto = {
      name: user.username,
      createdBy: user.id,
      updatedBy: user.id,
      description: 'CLI',
    };

    const group = await this.groupService.create(groupData);

    const userGroupData: CreateUserGroupDto = {
      groupId: group.id,
      userId: user.id,
      createdBy: user.id,
      updatedBy: user.id,
    };

    await this.userGroupService.create(userGroupData);

    return {
      username: user.username,
      group: group.name,
    };
  }

  forceChangePassword(payload: ForceChangePasswordDto) {
    const password = new Password(payload.newPassword.trim());

    return this.userService.updateByUsername(payload.username, { password: password.hash() });
  }

  findUserByUsername(username: string) {
    return this.userService.findByUsername(username);
  }
}
