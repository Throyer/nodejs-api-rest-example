import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from 'src/environments/authentication';
import { Authorized } from '../models/authorized';
import { Request } from '../models/request';
import { Token } from '../models/token';

@Injectable()
export class AuthorizeRequestService {
  async canAuthorize(
    http: HttpArgumentsHost,
    requirements: string[],
  ): Promise<boolean> {
    const request = http.getRequest<Request>();
    const header = request.headers.authorization;

    if (!header) {
      throw new HttpException(
        'JWT não esta presente no header.',
        HttpStatus.FORBIDDEN,
      );
    }

    const [, token] = header.split(' ');

    let roles: string[] = [];

    try {
      const jwt = verify(token, TOKEN_SECRET) as Token;

      request.authorized = new Authorized({
        id: Number(jwt.sub),
        roles: jwt.roles,
      });

      roles = jwt.roles;
    } catch {
      throw new HttpException(
        'Token expirado ou invalido.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (
      requirements.length &&
      roles.every((role) => requirements.every((required) => required !== role))
    ) {
      throw new HttpException(
        'Permissão invalida para este recurso.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
