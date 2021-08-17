import {
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION,
  TOKEN_SECRET,
} from '@config/env';
import { HttpStatusError } from '@errors/HttpStatusError';
import { User } from '@models/user/User';
import { HttpStatus } from '@shared/web/HttpStatus';
import { sign, verify } from 'jsonwebtoken';
import { createQueryBuilder } from 'typeorm';
import { RefreshTokenRequest } from './types/RefreshTokenRequest';
import { RefreshTokenResponse } from './types/RefreshTokenResponse';

export class RefreshTokenService {
  public async refresh({
    refresh_token,
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    try {
      const { sub: id } = verify(refresh_token, REFRESH_TOKEN_SECRET) as {
        sub: string;
      };

      const user = await createQueryBuilder(User, 'user')
        .innerJoin('user.roles', 'role')
        .where('user.id = :id AND user.active = true', {
          id,
        })
        .select(['user.id', 'role.initials'])
        .getOne();

      if (!user) {
        throw new HttpStatusError(HttpStatus.FORBIDDEN, 'Não autorizado.');
      }

      const roles = await Promise.all(
        user.roles.map(({ initials }) => initials),
      );

      const token = sign({ roles }, TOKEN_SECRET, {
        subject: id,
        expiresIn: TOKEN_EXPIRATION,
      });

      const new_refresh_token = sign({}, REFRESH_TOKEN_SECRET, {
        subject: id,
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      });

      return {
        token,
        refresh_token: new_refresh_token,
      };
    } catch (error) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Refresh token expirado ou invalido.',
      );
    }
  }
}
