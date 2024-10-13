import { UpdateUserDto } from '@modules/user/domain/dtos/update-user.dto';
import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { Login } from '@modules/user/domain/value-objects/login';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'modules/user/domain/entities/user.entity';
import { Model } from 'mongoose';
import { Password } from 'modules/user/domain/value-objects/password';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = new Password(createUserDto.password).hash();

    return this.userModel.create(createUserDto);
  }

  async login(login: Login) {
    const user = await this.userModel.findOne({ username: login.username });

    if (!user) {
      throw new BadRequestException('User or password incorrect');
    }

    const password = new Password(login.password);

    if (!password.compare(user.password)) {
      throw new BadRequestException('User or password incorrect');
    }

    return {
      accessToken: jwt.sign({ id: user.id }, '1234567', { expiresIn: '1h' }),
    };
  }

  updateByUsername(username: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ username }, updateUserDto);
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
