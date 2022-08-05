import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from '../user/entities/refresh-token.entity';
import { Role } from '../user/entities/role.entity';
import { User } from '../user/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, RefreshToken])],
  exports: [TypeOrmModule],
})
export class PersistenceModule {}
