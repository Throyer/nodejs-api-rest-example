import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { FindAllUsersService } from './services/find-all-users.service';
import { FindUserService } from './services/find-user.service';
import { PartialUpdateUserService } from './services/partial-update-user.service';
import { UpdateUserService } from './services/update-user.service';

@Module({
  providers: [
    FindAllUsersService,
    FindUserService,
    PartialUpdateUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
