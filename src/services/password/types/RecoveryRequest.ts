import { IsEmail } from 'class-validator';

export class RecoveryRequest {
  @IsEmail(
    {},
    {
      message: 'Informe um email valido.',
    },
  )
  email: string;
}
