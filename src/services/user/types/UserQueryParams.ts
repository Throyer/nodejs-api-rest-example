import { FindManyOptions, Like, FindConditions } from 'typeorm';

import { Paginator, Specification } from '@shared/pagination';

import { User } from '@models/user';

export class UserQueryParams extends Paginator implements Specification<User> {
  name?: string;

  getOptions(): FindManyOptions<User> {
    const where: FindConditions<User> = {};

    if (this.name) {
      where.name = Like(`%${this.name}%`);
    }

    return this.paginate({
      where,
    });
  }
}
