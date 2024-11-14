import { Inject, Injectable } from '@nestjs/common';
import { CreateUserGroupDto } from '../../domain/dtos/create-user-group.dto';
import { UpdateUserGroupDto } from '../../domain/dtos/update-user-group.dto';
import { Model } from 'mongoose';
import { UserGroup } from 'modules/user-group/domain/entities/user-group.entity';

@Injectable()
export class UserGroupService {
  constructor(
    @Inject(UserGroup)
    private readonly userGroupModel: Model<UserGroup>,
  ) {}

  create(createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupModel.create(createUserGroupDto);
  }

  findAll() {
    return `This action returns all userGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGroup`;
  }

  update(id: number, updateUserGroupDto: UpdateUserGroupDto) {
    return `This action updates a #${id} userGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGroup`;
  }
}
