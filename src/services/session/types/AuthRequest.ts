import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequest {
  @IsEmail()
  @IsNotEmpty({
    message: 'Informe o email',
  })
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha',
  })
  password: string;
}
