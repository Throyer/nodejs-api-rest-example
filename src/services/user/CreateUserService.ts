import { DeepPartial, Equal, getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import { Role, User } from '@models/user';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';

import { Session } from '@shared/auth';
import { CreateUserProps } from './types';

export class CreateUserService {
  userRepository: Repository<User> = getRepository(User);
  roleRepository: Repository<Role> = getRepository(Role);

  async create(
    { name, email, password, roles }: CreateUserProps,
    session: Session,
  ): Promise<User> {
    const exists = await this.userRepository.findOne({
      where: { email },
    });

    if (exists) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, 'Email já utilizado.');
    }

    const user: DeepPartial<User> = {
      name,
      email,
      password: await hash(password, 8),
      roles,
    };

    if (
      roles &&
      roles.length > 0 &&
      session.roles.every(role => role !== 'ADM')
    ) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Permissão invalida para cadastro de super user.',
      );
    }

    if (session.roles.every(role => role !== 'ADM')) {
      const role = await this.roleRepository.findOne({
        where: { initials: Equal('USER') },
        select: ['id'],
      });
      user.roles = [role];
    }

    const newUser = await this.userRepository.save(user);

    delete user.password;

    return newUser;
  }
}
