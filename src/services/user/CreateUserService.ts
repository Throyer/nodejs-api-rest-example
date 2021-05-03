import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from '@models/user';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';

import { CreateUserProps } from './types';

export class CreateUserService {
  repository: Repository<User> = getRepository(User);

  async create({
    name,
    email,
    password,
    roles,
  }: CreateUserProps): Promise<User> {
    const exists = await this.repository.findOne({
      where: { email },
    });

    if (exists) {
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, 'Email já utilizado.');
    }

    const user = await this.repository.save({
      name,
      email,
      password: await hash(password, 8),
      roles,
    });

    delete user.password;

    return user;
  }
}
