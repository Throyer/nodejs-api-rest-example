import { Injectable } from '@nestjs/common';
import { Page } from 'src/shared/pagination/page';
import { Pageable } from 'src/shared/pagination/pageable';
import { Paginator } from 'src/shared/pagination/paginator';
import { createQueryBuilder } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindAllUsersService {
  async paginate({ page, size }: Pageable): Promise<Page<User>> {
    const query = createQueryBuilder(User, 'user')
      .select(['user.id', 'user.name', 'user.email', 'role.initials'])
      .leftJoin('user.roles', 'role');

    const paginator = new Paginator({ page, size });

    paginator.query(query);

    const [content, count] = await query.getManyAndCount();

    return Page.of(content, count, paginator);
  }
}
