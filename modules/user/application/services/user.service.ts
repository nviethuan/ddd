import { UpdateUserDto } from '@modules/user/domain/dtos/update-user.dto';
import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { Login } from '@modules/user/domain/value-objects/login';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'modules/user/domain/entities/user.entity';
import { Model } from 'mongoose';
import { Password } from 'modules/user/domain/value-objects/password';
import jwt from 'jsonwebtoken';
import { JWT__PRIVATE_KEY } from '@common/configs/envs';
import { generateHashSha512 } from '@common/utils/hash';
import { RefreshToken } from '@modules/refresh-token/domain/entities/refresh-token.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private readonly userModel: Model<User>,
    @Inject(RefreshToken)
    private readonly refreshTokenModel: Model<RefreshToken>,
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

    const refreshToken = generateHashSha512(user.id.toString());

    await this.refreshTokenModel.create({
      uid: user.id,
      refreshToken,
    });

    return {
      accessToken: jwt.sign({ id: user.id }, Buffer.from(JWT__PRIVATE_KEY, 'base64'), {
        expiresIn: '1h',
        algorithm: 'RS256',
      }),
      refreshToken,
    };
  }

  updateByUsername(username: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ username }, updateUserDto);
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
