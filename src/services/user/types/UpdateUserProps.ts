import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

const MIN_NAME = 1;
const MAX_NAME = 100;

const MIN_NICKNAME = 1;
const MAX_NICKNAME = 30;

export class UpdateUserProps {
  @IsNotEmpty({ message: 'Informe um nome.' })
  @Length(MIN_NAME, MAX_NAME, {
    message: `O nome deve conter entre ${MIN_NAME} e ${MAX_NAME} caracteres.`,
  })
  name: string;

  @IsEmail(
    { allow_ip_domain: false },
    {
      message: 'Informe um email valido.',
    },
  )
  email: string;

  @IsOptional()
  @Length(MIN_NICKNAME, MAX_NICKNAME, {
    message: `O apelido deve conter entre ${MIN_NICKNAME} e ${MAX_NICKNAME} caracteres.`,
  })
  nickname?: string;

  @IsOptional()
  @Matches(/^(\(\d{2}\))\d{4,5}-\d{4}$/, {
    message:
      'Forneça um numero de telefone valido. (99)9999-9999 ou (99)99999-9999.',
  })
  phone?: string;
}
