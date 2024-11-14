import { AppAbility, CHECK_POLICIES_KEY } from '@app/casl/decorators/policies/policies.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandlerCallback[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    return true;
  }
}
