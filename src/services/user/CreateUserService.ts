import {
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION,
  TOKEN_SECRET,
} from '@config/env';
import { HttpStatusError } from '@errors/HttpStatusError';
import { Role } from '@models/user/Role';
import { User } from '@models/user/User';
import { HttpStatus } from '@shared/web/HttpStatus';
import { gravatar } from '@utils/avatar';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Equal, getRepository, Repository } from 'typeorm';
import { CreateUserProps } from './types/CreateUserProps';
import { CreateUserWithSession } from './types/CreateUserWithSession';
import { UserDetails } from './types/UserDetails';

export class CreateUserService {
  userRepository: Repository<User> = getRepository(User);
  roleRepository: Repository<Role> = getRepository(Role);

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

    const refresh_token = sign({}, REFRESH_TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return {
      ...new UserDetails(user),
      token,
      refresh_token,
    };
  }

  private async tryFindAvatarUrl(email: string): Promise<string | undefined> {
    return gravatar(email);
  }
}
