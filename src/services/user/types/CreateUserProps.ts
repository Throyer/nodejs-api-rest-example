import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserProps {
  @IsNotEmpty({ message: 'Informe um nome.' })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Informe uma senha.' })
  password: string;

  @IsArray()
  roles: { id: number }[];
}
