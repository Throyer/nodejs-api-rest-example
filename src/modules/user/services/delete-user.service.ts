import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authorized } from 'src/modules/authentication/models/authorized';
import { User } from 'src/modules/user/entities/user.entity';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class DeleteUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async delete(id: number, authorized: Authorized): Promise<void> {
    if (!authorized.isMeOrImADM(id)) {
      throw new UnauthorizedException('Not authorized to delete user');
    }

    const user = await createQueryBuilder(User, 'user')
      .leftJoin('user.roles', 'role')
      .select(['user.id'])
      .where('user.id = :user_id', { user_id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('resource not found');
    }

    await this.repository.update(id, {
      active: false,
      email: null,
      deletedEmail: user.email,
    });

    await this.repository.softDelete(id);
  }
}
