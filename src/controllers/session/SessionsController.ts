import { Post, JsonController, Body } from 'routing-controllers';

import { RefreshTokenService } from '@services/session/RefreshTokenService';
import { RefreshTokenRequest } from '@services/session/types/RefreshTokenRequest';
import { RefreshTokenResponse } from '@services/session/types/RefreshTokenResponse';
import { AuthenticateUserService } from '@services/session/AuthenticateUserService';
import { AuthRequest } from '@services/session/types/AuthRequest';
import { AuthResponse } from '@services/session/types/AuthResponse';

@JsonController('/sessions')
export class SessionsController {
  private auth = new AuthenticateUserService();
  private refreshToken = new RefreshTokenService();

  @Post()
  async authenticate(@Body() auth: AuthRequest): Promise<AuthResponse> {
    return this.auth.authenticate(auth);
  }

  @Post('/refresh')
  async refresh(
    @Body() body: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return this.refreshToken.refresh(body);
  }
}
