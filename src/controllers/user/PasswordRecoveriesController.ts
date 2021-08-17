import { ConfirmRecoveryCodeService } from '@services/password/ConfirmRecoveryCodeService';
import { RecoveryService } from '@services/password/RecoveryService';
import { ConfirmRecoveryRequest } from '@services/password/types/ConfirmRecoveryRequest';
import { RecoveryRequest } from '@services/password/types/RecoveryRequest';
import { UpdatePasswordRecoveryRequest } from '@services/password/types/UpdatePasswordRecovery';
import { UpdatePasswordRecoveryService } from '@services/password/UpdatePasswordRecoveryService';
import { Body, JsonController, OnUndefined, Post } from 'routing-controllers';

@JsonController('/password-recoveries')
export class PasswordRecoveriesController {
  private recoveryService = new RecoveryService();
  private confirmService = new ConfirmRecoveryCodeService();
  private updateService = new UpdatePasswordRecoveryService();

  @OnUndefined(204)
  @Post()
  async index(@Body() body: RecoveryRequest): Promise<void> {
    await this.recoveryService.recovery(body);
  }

  @OnUndefined(204)
  @Post('/confirm')
  async confirm(@Body() body: ConfirmRecoveryRequest): Promise<void> {
    await this.confirmService.confirm(body);
  }

  @OnUndefined(204)
  @Post('/update')
  async update(@Body() body: UpdatePasswordRecoveryRequest): Promise<void> {
    await this.updateService.update(body);
  }
}
