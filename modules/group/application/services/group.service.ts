import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../../domain/dtos/create-group.dto';
import { Model } from 'mongoose';
import { Group } from 'modules/group/domain/entities/group.entity';
import { CreateGroup } from '../ports/create-group';

@Injectable()
export class GroupService {
  constructor(
    @Inject(Group)
    private readonly groupModel: Model<Group>,
  ) {}

  create(createGroup: CreateGroup) {
    return this.groupModel.create(createGroup.payload);
  }

  deleteByName(name: string) {
    return this.groupModel.deleteOne({ name });
  }
}
