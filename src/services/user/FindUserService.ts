import { User } from '@models/user/User';
import { Page } from '@shared/pagination';
import { NotFoundError } from 'routing-controllers';
import { FindConditions, getRepository, Repository } from 'typeorm';
import { UserDetails } from './types/UserDetails';
import { UserQueryParams } from './types/UserQueryParams';

export class FindUserService {
  private repository: Repository<User> = getRepository(User);

  public async findPage(params: UserQueryParams): Promise<Page<UserDetails>> {
    const where: FindConditions<User> = {};

    const { page, size } = params;
    if (params.name) {
      where.name = params.name;
    }

    const options = params.paginate<User>({
      select: [
        'id',
        'name',
        'email',
        'nickname',
        'phone',
        'avatarUrl',
        'active',
      ],
      relations: ['roles'],
      where,
    });

    const [select, count] = await this.repository.findAndCount(options);

    const users = select.map(user => new UserDetails(user));

    return new Page(users, count, page, size);
  }

  public async findOne(id: number): Promise<UserDetails> {
    const user = await this.repository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'nickname',
        'phone',
        'avatarUrl',
        'active',
      ],
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundError('Não foi possível localizar usuário.');
    }

    const details = new UserDetails(user);

    return details;
  }
}
