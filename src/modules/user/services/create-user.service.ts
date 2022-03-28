import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Conflict } from 'src/http/default-body/conflict';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateUserProps } from '../dtos/create-user-props';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create({ name, email, password }: CreateUserProps): Promise<User> {
    const exists = await createQueryBuilder(User, 'user')
      .where('user.email = :email', { email })
      .select(['user.id'])
      .getCount();

    if (exists) {
      throw new HttpException(
        new Conflict('Email already used'),
        HttpStatus.CONFLICT,
      );
    }

    const roles = await createQueryBuilder(Role, 'role')
      .where("role.initials = 'USER'")
      .select(['role.id', 'role.initials'])
      .getMany();

    const user = await this.repository.save({
      name,
      email,
      password: await hash(password, 8),
      roles,
    });

    return user;
  }
}
