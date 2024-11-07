import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginPasswordService } from '../application/services/login-password.service';
import { CreateLoginPasswordDto } from '../domain/dto/create-login-password.dto';
import { UpdateLoginPasswordDto } from '../domain/dto/update-login-password.dto';

@Controller('login-password')
export class LoginPasswordController {
  constructor(private readonly loginPasswordService: LoginPasswordService) {}

  @Post()
  create(@Body() createLoginPasswordDto: CreateLoginPasswordDto) {
    return this.loginPasswordService.create(createLoginPasswordDto);
  }

  @Get()
  findAll() {
    return this.loginPasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginPasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginPasswordDto: UpdateLoginPasswordDto) {
    return this.loginPasswordService.update(+id, updateLoginPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginPasswordService.remove(+id);
  }
}
