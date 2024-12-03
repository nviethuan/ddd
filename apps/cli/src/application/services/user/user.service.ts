import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ForceChangePasswordDto } from 'apps/cli/src/infrastructure/commands/user/force-change-password.cmd';
import { CreateGroupDto } from '@modules/group/domain/dtos/create-group.dto';
import { GroupService } from 'modules/group/application/services/group.service';
import { CreateUserGroupDto } from '@modules/user-group/domain/dtos/create-user-group.dto';
import { UserGroupService } from 'modules/user-group/application/services/user-group.service';
import { UserService } from 'modules/user/application/services/user.service';
import { Password } from '@modules/user/application/ports/password';
import { Model, Mongoose } from 'mongoose';
import { CreateUserOptions } from 'apps/cli/src/infrastructure/commands/user/create-user.cmd';
import { User } from '@modules/user/domain/entities/user.entity';
import { Group } from '@modules/group/domain/entities/group.entity';
import { UserGroup } from '@modules/user-group/domain/entities/user-group.entity';
import { uppercaseStartCase } from '@common/utils/uppercase-start-case';
import { LoginPassword } from '@modules/login-password/domain/entities/login-password.entity';
import { Phone } from '@modules/phone/domain/entities/phone.entity';
import { Email } from '@modules/email/domain/entities/email.entity';
import countryCodes from 'apps/cli/src/utils/country-codes';

@Injectable()
export class UserCliService {
  constructor(
    @Inject(User)
    private readonly userModel: Model<User>,
    @Inject(Group)
    private readonly groupModel: Model<Group>,
    @Inject(UserGroup)
    private readonly userGroupModel: Model<UserGroup>,
    @Inject(LoginPassword)
    private readonly loginPasswordModel: Model<LoginPassword>,
    @Inject(Phone)
    private readonly phoneModel: Model<Phone>,
    @Inject(Email)
    private readonly emailModel: Model<Email>,
    @Inject(Mongoose)
    private readonly connection: Mongoose,
  ) {}

  async createUser(createUserDto: CreateUserOptions) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const [[user], rootGroup] = await Promise.all([
        this.userModel.create(
          [
            {
              username: createUserDto.username,
              fName: createUserDto.fName,
              lName: createUserDto.lName,
              locale: createUserDto.locale,
              isActive: createUserDto.isActive,
            },
          ],
          { session },
        ),
        createUserDto.isRoot && this.groupModel.findOne({ name: 'root' }),
      ]);

      let group: Group;

      if (createUserDto.isRoot) {
        [[group]] = await Promise.all([
          !rootGroup
            ? this.groupModel.create([{ name: user.username, displayName: uppercaseStartCase(user.username) }], {
                session,
              })
            : [rootGroup],
          this.userGroupModel.create(
            [{ user: user._id, group: rootGroup._id, createdBy: user._id, updatedBy: user._id }],
            { session },
          ),
        ]);
      }

      const countryCode = countryCodes[createUserDto.locale.split('-')[1]].dial_code;

      await Promise.all([
        !createUserDto.isRoot &&
          this.userGroupModel.create([{ user: user._id, group: group._id, createdBy: user._id, updatedBy: user._id }], {
            session,
          }),
        this.loginPasswordModel.create([{ refId: user._id, password: new Password(createUserDto.password).hash() }], {
          session,
        }),
        this.phoneModel.create(
          [
            {
              refId: user._id,
              number: createUserDto.phone,
              countryCode,
            },
          ],
          { session },
        ),
        this.emailModel.create([{ refId: user._id, email: createUserDto.email }], { session }),
      ]);

      await session.commitTransaction();

      return user;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  // forceChangePassword(payload: ForceChangePasswordDto) {
  //   const password = new Password(payload.newPassword.trim());

  //   return this.userService.updateByUsername(payload.username, { password: password.hash() });
  // }

  // findUserByUsername(username: string) {
  //   return this.userService.findByUsername(username);
  // }
}
