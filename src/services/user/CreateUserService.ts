import {
  REFRESH_TOKEN_EXPIRATION_IN_DAYS,
  TOKEN_EXPIRATION,
  TOKEN_SECRET,
} from '@config/env';
import { HttpStatusError } from '@errors/HttpStatusError';
import { RefreshToken } from '@models/user/RefreshToken';
import { Role } from '@models/user/Role';
import { User } from '@models/user/User';
import { HttpStatus } from '@shared/web/HttpStatus';
import { gravatar } from '@utils/avatar';
import { hash } from 'bcryptjs';
import { addDays } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { Equal, getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserProps } from './types/CreateUserProps';
import { CreateUserWithSession } from './types/CreateUserWithSession';
import { UserDetails } from './types/UserDetails';

export class CreateUserService {
  private userRepository = getRepository(User);
  private roleRepository = getRepository(Role);
  private refreshTokenRepository = getRepository(RefreshToken);

  async create({
    name,
    email,
    password,
    nickname,
    phone,
  }: CreateUserProps): Promise<CreateUserWithSession> {
    const exists = await this.userRepository.findOne({
      where: { email },
    });

    if (exists) {
      throw new HttpStatusError(
        HttpStatus.BAD_REQUEST,
        'Este email já é utilizado.',
      );
    }

    const role = await this.roleRepository.findOne({
      where: {
        initials: Equal('USER'),
      },
    });

    delete role.createdAt;
    delete role.updatedAt;

    const user = await this.userRepository.save({
      name,
      email,
      password: await hash(password, 8),
      nickname,
      phone,
      avatarUrl: await this.tryFindAvatarUrl(email),
      roles: [role],
    });

    const roles = [role.initials];

    const token = sign({ roles }, TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: TOKEN_EXPIRATION,
    });

    const code = uuid();

    await this.refreshTokenRepository.save({
      code,
      available: true,
      expiresIn: addDays(new Date(), REFRESH_TOKEN_EXPIRATION_IN_DAYS),
      userId: user.id,
    });

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return {
      ...new UserDetails(user),
      token,
      refresh_token: code,
    };
  }

  private async tryFindAvatarUrl(email: string): Promise<string | undefined> {
    return gravatar(email);
  }
}
