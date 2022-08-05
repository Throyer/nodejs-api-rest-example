import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Authorized } from '../models/authorized';
import { Request } from '../models/request';

export const ROLES_KEY = 'roles';

export type ROLE_INITIAL = 'USER' | 'ADM';

export const Authorize = (roles?: ROLE_INITIAL[]) =>
  applyDecorators(SetMetadata(ROLES_KEY, roles || []), ApiBearerAuth());

export const Session = createParamDecorator(
  (data: unknown, context: ExecutionContext): Authorized | undefined => {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    return request.authorized;
  },
);
