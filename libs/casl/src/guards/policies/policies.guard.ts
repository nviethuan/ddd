import { AppAbility, CHECK_POLICIES_KEY } from '@app/casl/decorators/policies/policies.decorator';
import { AuthRequest } from '@common/types/app-request';
import { decode } from '@common/utils/security';
import { Group } from '@modules/group/domain/entities/group.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandlerCallback[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    console.log(policyHandlers);

    const { user }: AuthRequest = context.switchToHttp().getRequest();
    const groups = JSON.parse(decode(user.gs)).map((group: Pick<Group, 'name' | '_id'>) => {
      group._id = new Types.ObjectId(group._id);
      return group;
    });
    console.log(groups);
    return true;
  }
}
