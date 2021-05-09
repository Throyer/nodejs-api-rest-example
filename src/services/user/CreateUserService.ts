import { Equal, getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import { Role, User } from '@models/user';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';

import { CreateUserProps } from './types';

export class CreateUserService {
  userRepository: Repository<User> = getRepository(User);
  roleRepository: Repository<Role> = getRepository(Role);

  async create({ name, email, password }: CreateUserProps): Promise<User> {
    const exists = await this.userRepository.findOne({
      where: { email },
    });

    if (exists) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, 'Email já utilizado.');
    }

    const role = await this.roleRepository.findOne({
      where: { initials: Equal('USER') },
      select: ['id'],
    });

    const user = await this.userRepository.save({
      name,
      email,
      password: await hash(password, 8),
      roles: [role],
    });

    delete user.password;

    return user;
  }
}
