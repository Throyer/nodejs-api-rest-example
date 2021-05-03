import { Post, JsonController, Body } from 'routing-controllers';

import {
  AuthenticateUserService,
  AuthRequest,
  AuthResponse,
} from '@services/session';

@JsonController('/sessions')
export class SessionsController {
  service = new AuthenticateUserService();

  @Post()
  async authenticate(@Body() auth: AuthRequest): Promise<AuthResponse> {
    return this.service.authenticate(auth);
  }
}
