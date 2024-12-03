import { Injectable } from '@nestjs/common';
import { CreateAccessInfoDto } from './dto/create-access-info.dto';
import { UpdateAccessInfoDto } from './dto/update-access-info.dto';

@Injectable()
export class AccessInfoService {
  create(createAccessInfoDto: CreateAccessInfoDto) {
    return 'This action adds a new accessInfo';
  }

  findAll() {
    return `This action returns all accessInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessInfo`;
  }

  update(id: number, updateAccessInfoDto: UpdateAccessInfoDto) {
    return `This action updates a #${id} accessInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessInfo`;
  }
}
