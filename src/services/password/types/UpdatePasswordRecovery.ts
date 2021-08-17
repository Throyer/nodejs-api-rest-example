import { IsNotEmpty, MinLength } from 'class-validator';
import { ConfirmRecoveryRequest } from './ConfirmRecoveryRequest';

const MIN_PASSWORD = 8;

export class UpdatePasswordRecoveryRequest extends ConfirmRecoveryRequest {
  @IsNotEmpty({ message: 'Informe uma senha.' })
  @MinLength(MIN_PASSWORD, {
    message: `A senha deve conter no minimo ${MIN_PASSWORD}`,
  })
  password: string;
}
