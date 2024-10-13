import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { Model } from 'mongoose';
import { Group } from 'modules/group/domain/entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @Inject(Group)
    private readonly groupModel: Model<Group>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupModel.create(createGroupDto);
  }

  deleteByName(name: string) {
    return this.groupModel.deleteOne({ name });
  }
}
