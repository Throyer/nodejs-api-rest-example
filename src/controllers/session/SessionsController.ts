import { Post, JsonController, Body } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import {
  AuthenticateUserService,
  AuthRequest,
  AuthResponse,
} from '@services/session';

@Service()
@JsonController('/sessions')
export class SessionsController {
  @Inject()
  service: AuthenticateUserService;

  @Post()
  async authenticate(@Body() auth: AuthRequest): Promise<AuthResponse> {
    return this.service.authenticate(auth);
  }
}
