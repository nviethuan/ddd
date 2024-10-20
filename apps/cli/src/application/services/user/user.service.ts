import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ForceChangePasswordDto } from 'apps/cli/src/infrastructure/commands/user/force-change-password.cmd';
import { CreateGroupDto } from 'modules/group/application/dtos/create-group.dto';
import { GroupService } from 'modules/group/application/services/group.service';
import { CreateUserGroupDto } from 'modules/user-group/application/dtos/create-user-group.dto';
import { UserGroupService } from 'modules/user-group/application/services/user-group.service';
import { UserService } from 'modules/user/application/services/user.service';
import { Password } from 'modules/user/domain/value-objects/password';
import { Mongoose } from 'mongoose';

@Injectable()
export class UserCliService {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createSystemUser(createUserDto);
  }

  forceChangePassword(payload: ForceChangePasswordDto) {
    const password = new Password(payload.newPassword.trim());

    return this.userService.updateByUsername(payload.username, { password: password.hash() });
  }

  findUserByUsername(username: string) {
    return this.userService.findByUsername(username);
  }
}
