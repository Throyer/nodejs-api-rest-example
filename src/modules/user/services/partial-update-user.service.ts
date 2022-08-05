import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { createQueryBuilder, DeepPartial, Equal, Repository } from 'typeorm';
import { PartialUpdateUser } from '../dtos/partial-update-user';

@Injectable()
export class PartialUpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async update(id: number, { name }: PartialUpdateUser): Promise<User> {
    const query = createQueryBuilder(User, 'user')
      .select(['user.id'])
      .where('user.id = :user_id', { user_id: id });

    const user = await query.getOne();

    if (!user) {
      throw new NotFoundException('resource not found');
    }

    const fields: DeepPartial<User> = {};

    if (name) {
      fields.name = name;
    }

    await this.repository.update(
      {
        id: Equal(id),
      },
      fields,
    );

    const updated = await createQueryBuilder(User, 'user')
      .leftJoin('user.roles', 'role')
      .select(['user.id', 'user.name', 'user.email', 'role.initials'])
      .where('user.id = :user_id', { user_id: id })
      .getOne();

    return updated;
  }
}
