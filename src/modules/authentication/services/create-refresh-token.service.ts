import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { createQueryBuilder, Equal, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';
import { RefreshToken } from 'src/modules/user/entities/refresh-token.entity';
import { RefreshTokenRequest } from '../dtos/refresh-token-request';
import { TokenResponse } from '../dtos/token-response';
import {
  REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS,
  TOKEN_EXPIRATION_IN_MILLISECONDS,
  TOKEN_SECRET,
} from 'src/environments/authentication';
import { UserInformation } from 'src/modules/user/dtos/user-information';

@Injectable()
export class CreateRefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create({
    refreshToken: code,
    device,
  }: RefreshTokenRequest): Promise<TokenResponse> {
    const refreshToken = await createQueryBuilder(RefreshToken, 'refresh')
      .leftJoin('refresh.user', 'user')
      .leftJoin('user.roles', 'role')
      .select([
        'refresh.id',
        'user.id',
        'user.name',
        'user.email',
        'role.initials',
      ])
      .where(
        'refresh.code = :code AND refresh.device_code = :device AND refresh.available = true AND refresh.expires_in > now()',
        {
          code,
          device: device.code || 'default',
        },
      )
      .getOne();

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token expired or invalid',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = refreshToken.user;

    const roles = user.roles.map((role) => role.initials);

    const accessToken = sign({ roles }, TOKEN_SECRET, {
      subject: user.id.toString(),
      expiresIn: `${TOKEN_EXPIRATION_IN_MILLISECONDS / 1000}s`,
    });

    return {
      user: new UserInformation({
        ...user,
        roles,
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
