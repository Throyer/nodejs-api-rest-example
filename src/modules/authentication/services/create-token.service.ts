import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import {
  REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS,
  TOKEN_EXPIRATION_IN_MILLISECONDS,
  TOKEN_SECRET,
} from 'src/environments/authentication';
import { RefreshToken } from 'src/modules/user/entities/refresh-token.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { createQueryBuilder, Equal, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TokenRequest } from '../dtos/token-request';
import { TokenResponse } from '../dtos/token-response';
import { add } from 'date-fns';
import { compare } from 'bcryptjs';
import { UserInformation } from 'src/modules/user/dtos/user-information';

@Injectable()
export class CreateTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create({
    email,
    password,
    device,
  }: TokenRequest): Promise<TokenResponse> {
    const user = await createQueryBuilder(User, 'user')
      .innerJoin('user.roles', 'role')
      .andWhere('user.email = :email', { email })
      .andWhere('user.active = true')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'role.initials',
      ])
      .getOne();

    if (!user) {
      throw new HttpException(
        'Incorrect email or password.',
        HttpStatus.FORBIDDEN,
      );
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new HttpException(
        'Incorrect email or password.',
        HttpStatus.FORBIDDEN,
      );
    }

    const roles = user.roles.map((role) => role.initials);

    const accessToken = sign({ roles }, TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: `${TOKEN_EXPIRATION_IN_MILLISECONDS / 1000}s`,
    });

    return {
      user: new UserInformation({
        ...user,
        roles: user.roles.map((role) => role.initials),
      }),
      accessToken,
      refreshToken: await this.getRefreshToken({
        userId: user.id,
        deviceCode: device?.code,
      }),
    };
  }

  private async getRefreshToken({
    userId,
    deviceCode = 'default',
  }): Promise<string> {
    await this.refreshTokenRepository.update(
      {
        userId: Equal(userId),
        deviceCode: Equal(deviceCode),
      },
      {
        available: false,
      },
    );

    const { code } = await this.refreshTokenRepository.save({
      code: uuid(),
      deviceCode,
      userId,
      available: true,
      expiresIn: add(new Date(), {
        seconds: REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS / 1000,
      }),
    });

    return code;
  }
}
