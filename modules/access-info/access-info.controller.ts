import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessInfoService } from './access-info.service';
import { CreateAccessInfoDto } from './dto/create-access-info.dto';
import { UpdateAccessInfoDto } from './dto/update-access-info.dto';

@Controller('access-info')
export class AccessInfoController {
  constructor(private readonly accessInfoService: AccessInfoService) {}

  @Post()
  create(@Body() createAccessInfoDto: CreateAccessInfoDto) {
    return this.accessInfoService.create(createAccessInfoDto);
  }

  @Get()
  findAll() {
    return this.accessInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessInfoDto: UpdateAccessInfoDto) {
    return this.accessInfoService.update(+id, updateAccessInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessInfoService.remove(+id);
  }
}
