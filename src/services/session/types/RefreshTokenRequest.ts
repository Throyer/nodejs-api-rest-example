import { IsString } from 'class-validator';

export class RefreshTokenRequest {
  @IsString({
    message: 'Informe o token (JWT).',
  })
  refresh_token: string;
}
