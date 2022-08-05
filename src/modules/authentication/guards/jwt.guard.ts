import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizeRequestService } from '../services/authorize-request.service';
import { RoleExtractorService } from '../services/role-extractor.service';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly extractor: RoleExtractorService,
    private readonly authorize: AuthorizeRequestService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.extractor.extract(context);

    if (!roles) {
      return true;
    }

    return this.authorize.canAuthorize(context.switchToHttp(), roles);
  }
}
