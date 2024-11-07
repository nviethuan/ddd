import { Injectable } from '@nestjs/common';
import { CreatePasswordManagementDto } from '../../domain/dto/create-password-management.dto';
import { UpdatePasswordManagementDto } from '../../domain/dto/update-password-management.dto';

@Injectable()
export class PasswordManagementService {
  create(createPasswordManagementDto: CreatePasswordManagementDto) {
    return 'This action adds a new passwordManagement';
  }

  findAll() {
    return `This action returns all passwordManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordManagement`;
  }

  update(id: number, updatePasswordManagementDto: UpdatePasswordManagementDto) {
    return `This action updates a #${id} passwordManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordManagement`;
  }
}
