import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, Length } from 'class-validator';

export class CreateUserProps {
  @ApiProperty({ example: 'Jubileu' })
  @IsString()
  @MaxLength(180)
  name: string;

  @ApiProperty({ example: 'jubileu@email.com' })
  @IsEmail()
  @MaxLength(180)
  email: string;

  @ApiProperty({ example: 'verySecurePassword123456' })
  @IsString()
  @Length(8, 180)
  password: string;
}
