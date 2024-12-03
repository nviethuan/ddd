import { Inject, Injectable } from '@nestjs/common';
import { CreateResourceDto } from '../../domain/dto/create-resource.dto';
import { UpdateResourceDto } from '../../domain/dto/update-resource.dto';
import { Model } from 'mongoose';
import { Resource } from '@modules/resource/domain/entities/resource.entity';
import { uppercaseStartCase } from '@common/utils/uppercase-start-case';

@Injectable()
export class ResourceService {
  constructor(
    @Inject(Resource)
    private readonly resourceModel: Model<Resource>,
  ) {}

  create(createResourceDto: CreateResourceDto) {
    createResourceDto.label = uppercaseStartCase(createResourceDto.label);

    return this.resourceModel.create(createResourceDto);
  }

  findAll() {
    return this.resourceModel.find();
  }

  findOne(id: number) {
    return this.resourceModel.findById(id);
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return this.resourceModel.findByIdAndUpdate(id, updateResourceDto);
  }

  remove(id: number) {
    return this.resourceModel.findByIdAndDelete(id);
  }
}
