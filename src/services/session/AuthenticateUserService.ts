import { getRepository, Repository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { TOKEN_EXPIRATION, TOKEN_SECRET } from '@config/env';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';
import { User } from '@models/user';

import { AuthRequest, AuthResponse } from './types';

export class AuthenticateUserService {
  repository: Repository<User> = getRepository(User);

  async authenticate({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!user) {
      throw new HttpStatusError(
        HttpStatus.UNAUTHORIZED,
        'Email ou senha incorretos.',
      );
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new HttpStatusError(
        HttpStatus.UNAUTHORIZED,
        'Email ou senha incorretos.',
      );
    }

    const roles = user.roles.map(role => role.initials);

    const token = sign({ roles }, TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: TOKEN_EXPIRATION,
    });

    delete user.password;
    delete user.roles;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
      },
      token,
    };
  }
}
