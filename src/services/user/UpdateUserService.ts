import { getRepository, Repository } from 'typeorm';
import { NotFoundError } from 'routing-controllers';

import { User } from '@models/user';

import { UpdateUserProps } from './types';

export class UpdateUserService {
  repository: Repository<User> = getRepository(User);

  async update(id: number, partial: UpdateUserProps): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) throw new NotFoundError();

    this.repository.merge(user, partial);

    const updated = await this.repository.save(user);

    return updated;
  }
}
