import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import * as connection from './database/connection';
import {
  MAX_REQUESTS_PER_MINUTE,
  TIME_EXPIRE_RATE_LIMIT_IN_MINUTES,
} from './environments/server';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from './modules/authentication/guards/jwt.guard';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: TIME_EXPIRE_RATE_LIMIT_IN_MINUTES,
      limit: MAX_REQUESTS_PER_MINUTE,
    }),
    TypeOrmModule.forRoot(connection),
    AuthenticationModule,
    UserModule,
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JWTGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
