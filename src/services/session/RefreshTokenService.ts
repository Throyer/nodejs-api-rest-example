import {
  REFRESH_TOKEN_EXPIRATION_IN_DAYS,
  TOKEN_EXPIRATION,
  TOKEN_SECRET,
} from '@config/env';
import { HttpStatusError } from '@errors/HttpStatusError';
import { RefreshToken } from '@models/user/RefreshToken';
import { HttpStatus } from '@shared/web/HttpStatus';
import { addDays } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { createQueryBuilder, getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RefreshTokenRequest } from './types/RefreshTokenRequest';
import { RefreshTokenResponse } from './types/RefreshTokenResponse';

export class RefreshTokenService {
  private repository = getRepository(RefreshToken);

  public async refresh({
    refresh_token,
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const old = await createQueryBuilder(RefreshToken, 'refresh')
      .leftJoin('refresh.user', 'user')
      .leftJoin('user.roles', 'role')
      .select(['refresh.userId', 'user.id', 'role.initials'])
      .where(
        'refresh.expires_in >= :now AND refresh.code = :code AND refresh.available = true',
        {
          now: new Date(),
          code: refresh_token,
        },
      )
      .getOne();

    if (!old) {
      throw new HttpStatusError(HttpStatus.FORBIDDEN, 'Não autorizado.');
    }

    await this.repository.update(
      {
        userId: old.userId,
        available: true,
      },
      {
        available: false,
      },
    );

    const { user } = old;

    if (!user) {
      throw new HttpStatusError(HttpStatus.FORBIDDEN, 'Não autorizado.');
    }

    const code = uuid();

    await this.repository.save({
      code,
      available: true,
      expiresIn: addDays(new Date(), REFRESH_TOKEN_EXPIRATION_IN_DAYS),
      userId: user.id,
    });

    const roles = user.roles.map(({ initials }) => initials);

    const token = sign({ roles }, TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: TOKEN_EXPIRATION,
    });

    return {
      token,
      refresh_token: code,
    };
  }
}
