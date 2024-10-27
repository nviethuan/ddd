import { UpdateUserDto } from '@modules/user/domain/dtos/update-user.dto';
import { CreateUserDto } from '@modules/user/domain/dtos/create-user.dto';
import { Login } from '@modules/user/domain/value-objects/login';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'modules/user/domain/entities/user.entity';
import { Model, Mongoose } from 'mongoose';
import { Password } from 'modules/user/domain/value-objects/password';
import jwt from 'jsonwebtoken';
import { JWT__PRIVATE_KEY } from '@common/configs/envs';
import { generateHashSha512 } from '@common/utils/hash';
import { RefreshToken } from '@modules/refresh-token/domain/entities/refresh-token.entity';
import { Group } from '@modules/group/domain/entities/group.entity';
import { UserGroup } from '@modules/user-group/domain/entities/user-group.entity';
import { Collection } from '@common/constants/collections';
import { toFieldName } from '@common/utils/toFieldName';
import { encode } from '@common/utils/security';
import { sleep } from '@common/utils/sleep';
import KeyvRedis from '@keyv/redis';

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private readonly userModel: Model<User>,
    @Inject(Group)
    private readonly groupModel: Model<Group>,
    @Inject(UserGroup)
    private readonly userGroupModel: Model<UserGroup>,
    @Inject(RefreshToken)
    private readonly refreshTokenModel: Model<RefreshToken>,
    @Inject(Mongoose)
    private readonly connection: Mongoose,
    @Inject(KeyvRedis)
    private readonly redis: KeyvRedis,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = new Password(createUserDto.password).hash();

    return this.userModel.create(createUserDto);
  }

  async login(login: Login) {
    const [user] = await this.userModel.aggregate([
      {
        $match: {
          username: login.username,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: Collection.USER_GROUP,
          localField: '_id',
          foreignField: 'user',
          as: Collection.USER_GROUP,
          pipeline: [
            { $lookup: { from: Collection.GROUP, localField: 'group', foreignField: '_id', as: Collection.GROUP } },
            {
              $unwind: {
                path: toFieldName(Collection.GROUP),
                preserveNullAndEmptyArrays: false,
              },
            },
          ],
        },
      },
    ]);

    if (!user) {
      throw new BadRequestException('User or password incorrect');
    }

    const password = new Password(login.password);

    if (!password.compare(user.password)) {
      throw new BadRequestException('User or password incorrect');
    }

    const refreshToken = generateHashSha512(user._id.toString());

    await this.refreshTokenModel.create({
      uid: user._id,
      refreshToken,
    });

    delete user.password;

    const payload = {
      _id: user._id.toString(),
      username: user.username,
      gs: encode(
        JSON.stringify(
          user[Collection.USER_GROUP].map((ug: UserGroup) => {
            const group = ug[Collection.GROUP];
            return {
              _id: group._id.toString(),
              name: group.name,
            };
          }),
        ),
      ),
    };

    this.redis.namespace = 'auth';
    await this.redis.set(refreshToken, JSON.stringify(payload), 2_592_000_000); // 2_592_000_000 is 30 days in milliseconds

    await sleep(1000);

    return {
      accessToken: jwt.sign(payload, Buffer.from(JWT__PRIVATE_KEY, 'base64'), {
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

  /**
   * Create a system user
   * full access to the system
   * group: admin
   * permission: full access
   * @param createUserDto
   * @returns
   */
  async createSystemUser(createUserDto: CreateUserDto) {
    const sesstion = await this.connection.startSession();

    sesstion.startTransaction();

    try {
      const [user] = await this.userModel.create(
        [
          {
            email: createUserDto.email,
            username: createUserDto.username,
            password: new Password(createUserDto.password).hash(),
            createdBy: null,
            updatedBy: null,
            fName: createUserDto.fName,
            lName: createUserDto.lName,
            locale: createUserDto.locale,
            phone: createUserDto.phone,
            isActive: true,
          },
        ],
        { session: sesstion },
      );

      const [group] = await this.groupModel.create(
        [
          {
            name: createUserDto.username,
            description: 'CLI',
            createdBy: user.id,
            updatedBy: user.id,
          },
        ],
        { session: sesstion },
      );

      await this.userGroupModel.create(
        [
          {
            user: user.id,
            group: group.id,
            createdBy: user.id,
            updatedBy: user.id,
          },
        ],
        { session: sesstion },
      );

      await sesstion.commitTransaction();

      return user;
    } catch (error) {
      await sesstion.abortTransaction();
      throw error;
    }
  }
}
