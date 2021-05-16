import { InjectRepository } from 'typeorm-typedi-extensions';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { Service } from 'typedi';

import { HttpStatusError } from '@errors/HttpStatusError';

import { Role, User } from '@models/user';

import { Session } from '@shared/auth';
import { HttpStatus } from '@shared/web/HttpStatus';

import { CreateUserProps } from './types';

@Service()
export class CreateUserService {
  @InjectRepository(User)
  userRepository: Repository<User>;

  @InjectRepository(Role)
  roleRepository: Repository<Role>;

  async create(
    { name, email, password, nickname, phone, roles }: CreateUserProps,
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
      nickname,
      phone,
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
