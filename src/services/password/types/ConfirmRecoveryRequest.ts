import { IsNotEmpty } from 'class-validator';
import { RecoveryRequest } from './RecoveryRequest';

export class ConfirmRecoveryRequest extends RecoveryRequest {
  @IsNotEmpty({
    message: 'Informe o código',
  })
  code: string;
}
