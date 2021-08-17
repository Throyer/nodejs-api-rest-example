import { User } from '@models/user/User';
import { PasswordRecovery } from '@models/user/PasswordRecovery';
import { MailService } from '@services/mail/MailService';
import { generateCode } from '@utils/random/code-generator';
import { addMinutes } from 'date-fns';
import { DeepPartial, getRepository, Repository } from 'typeorm';
import { RecoveryRequest } from './types/RecoveryRequest';

export class RecoveryService {
  constructor(
    private recoveries: Repository<PasswordRecovery> = getRepository(
      PasswordRecovery,
    ),
    private users: Repository<User> = getRepository(User),
    private mailService = new MailService(),
  ) {}

  public async recovery({ email }: RecoveryRequest): Promise<void> {
    const user = await this.users.findOne({
      where: {
        email,
        active: true,
      },
      select: ['id', 'name'],
    });

    if (!user) {
      return;
    }

    const recovery: DeepPartial<PasswordRecovery> = {
      code: generateCode(),
      confirmed: false,
      used: false,
      expiresIn: addMinutes(new Date(), 20),
      user: {
        id: user.id,
      },
    };

    this.recoveries.save(recovery);

    const [first, second, third, fourth] = recovery.code.split('');

    try {
      this.mailService.send({
        destination: email,
        subject: 'Código de verificação.',
        template: 'password-recovery',
        replacements: {
          name: user.name,
          first,
          second,
          third,
          fourth,
        },
      });
    } catch {
      console.error(`Não foi possível enviar o recovery code para: ${email}`);
    }
  }
}
