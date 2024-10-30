import { APP__API_KEY } from '@common/configs/envs';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-token'];
    if (!apiKey || apiKey !== APP__API_KEY) {
      throw new UnauthorizedException('API key is required');
    }
    return true;
  }
}
