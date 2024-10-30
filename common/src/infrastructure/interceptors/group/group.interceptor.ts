import { AuthRequest } from '@common/types/app-request';
import { decode } from '@common/utils/security';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class GroupInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: AuthRequest = context.switchToHttp().getRequest();

    req.user.gs = JSON.parse(decode(req.user.gs as string)).map((group) => ({
      name: group.name,
      _id: new Types.ObjectId(group._id),
    }));

    return next.handle();
  }
}
