import { HttpStatusError } from '@errors/HttpStatusError';
import { User } from '@models/user/User';
import { PasswordRecovery } from '@models/user/PasswordRecovery';
import { HttpStatus } from '@shared/web/HttpStatus';
import { hash } from 'bcryptjs';
import { getRepository, Repository } from 'typeorm';
import { UpdatePasswordRecoveryRequest } from './types/UpdatePasswordRecovery';

export class UpdatePasswordRecoveryService {
  constructor(
    private recoveries: Repository<PasswordRecovery> = getRepository(
      PasswordRecovery,
    ),
    private users: Repository<User> = getRepository(User),
  ) {}

  public async update({
    email,
    code,
    password,
  }: UpdatePasswordRecoveryRequest): Promise<void> {
    const user = await this.users.findOne({
      where: {
        email,
        active: true,
      },
      select: ['id'],
    });

    if (!user) {
      throw new HttpStatusError(HttpStatus.FORBIDDEN);
    }

    const recovery = await this.recoveries.findOne({
      where: {
        user: {
          id: user.id,
        },
        used: false,
        confirmed: true,
      },
      order: {
        expiresIn: 'DESC',
      },
    });

    if (!recovery || recovery.code !== code) {
      throw new HttpStatusError(HttpStatus.FORBIDDEN);
    }

    this.users.update(user.id, {
      password: await hash(password, 8),
    });

    this.recoveries.update(recovery.id, {
      used: true,
    });
  }
}
