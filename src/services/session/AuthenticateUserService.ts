import {
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION,
  TOKEN_SECRET,
} from '@config/env';
import { HttpStatusError } from '@errors/HttpStatusError';
import { User } from '@models/user/User';
import { HttpStatus } from '@shared/web/HttpStatus';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { createQueryBuilder } from 'typeorm';
import { AuthRequest } from './types/AuthRequest';
import { AuthResponse } from './types/AuthResponse';

export class AuthenticateUserService {
  async authenticate({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = await createQueryBuilder(User, 'user')
      .innerJoin('user.roles', 'role')
      .where('user.email = :email AND user.active = true', {
        email,
      })
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.nickname',
        'user.avatarUrl',
        'user.phone',
        'user.password',
        'role.initials',
      ])
      .getOne();

    if (!user) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Email ou senha incorretos.',
      );
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Email ou senha incorretos.',
      );
    }

    const roles = user.roles.map(role => role.initials);

    const token = sign({ roles }, TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: TOKEN_EXPIRATION,
    });

    const refresh_token = sign({}, REFRESH_TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    delete user.password;
    delete user.roles;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        roles,
      },
      token,
      refresh_token,
    };
  }
}
