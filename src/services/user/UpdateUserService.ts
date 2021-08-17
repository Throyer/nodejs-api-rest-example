import { HttpStatusError } from '@errors/HttpStatusError';
import { User } from '@models/user/User';
import { HttpStatus } from '@shared/web/HttpStatus';
import { gravatar } from '@utils/avatar';
import { NotFoundError } from 'routing-controllers';
import { getRepository, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateUserProps } from './types/UpdateUserProps';

export class UpdateUserService {
  repository: Repository<User> = getRepository(User);

  async update(
    id: number,
    { email, name, nickname, phone, avatar }: UpdateUserProps,
  ): Promise<UpdateUserProps> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      select: ['id'],
    });

    if (!user) {
      throw new NotFoundError();
    }

    if (email) {
      const owner = await this.repository.findOne({
        where: {
          email,
        },
        select: ['id'],
      });

      if (owner && owner.id !== id) {
        throw new HttpStatusError(
          HttpStatus.BAD_REQUEST,
          'Este email já é utilizado.',
        );
      }
    }

    const fields: QueryDeepPartialEntity<User> = {};

    if (email) {
      fields.email = email;
      if (!avatar) {
        avatar = await gravatar(email);
      }
    }

    if (name) {
      fields.name = name;
    }

    if (nickname) {
      fields.nickname = nickname;
    }

    if (phone) {
      fields.phone = phone;
    }

    if (avatar) {
      fields.avatarUrl = avatar;
    }

    if (Object.keys(fields).length) {
      await this.repository.update(user.id, fields);
      return {
        avatar,
        email,
        name,
        nickname,
        phone,
      };
    }

    return null;
  }
}
