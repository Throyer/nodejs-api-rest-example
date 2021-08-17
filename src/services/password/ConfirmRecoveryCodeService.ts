import { HttpStatusError } from '@errors/HttpStatusError';
import { User } from '@models/user/User';
import { PasswordRecovery } from '@models/user/PasswordRecovery';
import { HttpStatus } from '@shared/web/HttpStatus';
import { isAfter } from 'date-fns';
import { getRepository, Repository } from 'typeorm';
import { ConfirmRecoveryRequest } from './types/ConfirmRecoveryRequest';

export class ConfirmRecoveryCodeService {
  constructor(
    private recoveries: Repository<PasswordRecovery> = getRepository(
      PasswordRecovery,
    ),
    private users: Repository<User> = getRepository(User),
  ) {}

  public async confirm({ email, code }: ConfirmRecoveryRequest): Promise<void> {
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
        confirmed: false,
      },
      order: {
        expiresIn: 'DESC',
      },
    });

    if (
      !recovery ||
      recovery.code !== code ||
      isAfter(new Date(), recovery.expiresIn)
    ) {
      throw new HttpStatusError(HttpStatus.FORBIDDEN);
    }

    this.recoveries.update(recovery.id, {
      confirmed: true,
    });
  }
}
