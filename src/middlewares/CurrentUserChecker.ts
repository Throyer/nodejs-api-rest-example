import { Action } from 'routing-controllers';
import { verify } from 'jsonwebtoken';

import { TOKEN_SECRET } from '@config/env';
import { Session, Token } from '@shared/auth';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';

export const CurrentUserChecker = async (action: Action): Promise<Session> => {
  const header = action.request.headers.authorization;

  if (!header) {
    throw new HttpStatusError(
      HttpStatus.UNAUTHORIZED,
      'JWT não esta presente no header.',
    );
  }

  const [, token] = header.split(' ');

  try {
    const { sub: id, roles } = verify(token, TOKEN_SECRET) as Token;

    return {
      id: Number(id),
      roles,
    };
  } catch {
    throw new HttpStatusError(
      HttpStatus.UNAUTHORIZED,
      'Token expirado ou invalido.',
    );
  }
};
