import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../helpers/session';

@Injectable()
export class RoleExtractorService {
  constructor(private reflector: Reflector) {}

  extract(context: ExecutionContext): string[] | undefined {
    const [inMethod, inClass] = this.extractAuthorizers(context);

    if (inMethod || inClass) {
      return this.extractRoles(inMethod, inClass);
    }

    return;
  }

  private extractRoles(inMethod: string[], inClass: string[]): string[] {
    return Array.from(
      new Set(
        [inMethod, inClass].reduce<string[]>((roles, decorator) => {
          if (decorator) {
            roles = [...roles, ...decorator];
          }
          return roles;
        }, []),
      ),
    );
  }

  private extractAuthorizers(context: ExecutionContext): string[][] {
    return this.reflector.getAll<string[][]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
