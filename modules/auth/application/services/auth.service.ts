import { JWT__PRIVATE_KEY } from '@common/configs/envs';
import { BUFFER_ENCODING } from '@common/constants/buffer-encoding';
import { generateHashSha512 } from '@common/utils/hash';
import KeyvRedis from '@keyv/redis';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../ports/refresh-token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(KeyvRedis)
    private readonly redis: KeyvRedis,
  ) {}

  async refreshToken(refreshToken: RefreshToken) {
    if (!refreshToken.refreshToken) {
      throw new BadRequestException();
    }

    const data = await this.redis.get(refreshToken.refreshToken);

    if (!data) {
      throw new BadRequestException();
    }

    await this.redis.delete(refreshToken.refreshToken);

    const user = JSON.parse(data as string);

    const newRefreshToken = generateHashSha512(user._id.toString());

    const accessToken = jwt.sign(user, Buffer.from(JWT__PRIVATE_KEY, BUFFER_ENCODING), {
      expiresIn: '1h',
      algorithm: 'RS256',
    });

    await this.redis.set(newRefreshToken, JSON.stringify(user), 2_592_000_000); // 2_592_000_000 is 30 days in milliseconds

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
