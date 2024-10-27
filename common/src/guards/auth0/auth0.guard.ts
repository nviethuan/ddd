import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import { JWT__PUBLIC_KEY } from '@common/configs/envs';
import { Model, Schema } from 'mongoose';
import { User } from '@modules/user/domain/entities/user.entity';
import { decode } from '@common/utils/security';

@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(
    @Inject(User)
    private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = jwt.verify(token, Buffer.from(JWT__PUBLIC_KEY, 'base64'), {
        algorithms: ['RS256'],
      });

      if (decoded) {
        const user = await this.userModel.findById(decoded._id).select('-password');

        request.user = user;
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
