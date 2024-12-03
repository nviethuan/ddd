import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from '../../domain/dto/create-resource.dto';
import { UpdateResourceDto } from '../../domain/dto/update-resource.dto';

@Injectable()
export class ResourceService {
  create(createResourceDto: CreateResourceDto) {
    return 'This action adds a new resource';
  }

  findAll() {
    return `This action returns all resource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
