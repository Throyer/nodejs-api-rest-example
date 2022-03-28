import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserInformation {
  @ApiProperty({ example: '9' })
  id: number;

  @ApiProperty({ example: 'Jubileu' })
  name: string;

  @ApiProperty({ example: 'jubileu@email.com' })
  email: string;

  @ApiProperty({ example: '["USER", "ADM"]' })
  roles: string[];

  constructor({ id, name, email, roles }: Partial<UserInformation>) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
  }

  public static from({ id, name, email, roles }: User): UserInformation {
    return new UserInformation({
      id,
      name,
      email,
      roles: roles.map((role) => role.initials),
    });
  }
}

export const extract = ({ id, name, email, roles }: User): UserInformation =>
  new UserInformation({
    id,
    name,
    email,
    roles: roles.map((role) => role.initials),
  });
