import { FindConditions, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

import { Page } from '@shared/pagination';
import { User } from '@models/user';

import { UserQueryParams, UserDTO } from './types';
import { createUserDTO } from './utils/create-user-dto';

@Service()
export class FindUserService {
  @InjectRepository(User)
  private repository: Repository<User>;

  public async findPage(query: UserQueryParams): Promise<Page<UserDTO>> {
    const where: FindConditions<User> = {};

    const { page, size } = query;
    if (query.name) {
      where.name = query.name;
    }

    const options = query.paginate<User>({
      select: ['id', 'name', 'email'],
      relations: ['roles'],
      where,
    });

    const [select, count] = await this.repository.findAndCount(options);

    const users = select.map(createUserDTO);

    return new Page(await Promise.all(users), count, page, size);
  }

  public async findOne(id: number): Promise<UserDTO> {
    return createUserDTO(
      await this.repository.findOne({
        where: { id },
        select: ['id', 'name', 'email'],
        relations: ['roles'],
      }),
    );
  }
}
