import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class FindUserService {
  async find(id: number): Promise<User> {
    const query = createQueryBuilder(User, 'user')
      .leftJoin('user.roles', 'role')
      .select(['user.id', 'user.name', 'user.email', 'role.initials'])
      .where('user.id = :user_id', { user_id: id });

    const user = await query.getOne();

    if (!user) {
      throw new NotFoundException('resource not found');
    }

    return user;
  }
}
