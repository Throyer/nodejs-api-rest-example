import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserProps {
  @IsNotEmpty({ message: 'Informe um nome.' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Informe uma senha.' })
  email: string;

  @IsArray()
  roles: { id: number }[];
}
