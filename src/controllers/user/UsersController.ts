import { getRepository } from 'typeorm';
import {
  Get,
  JsonController,
  Param,
  Post,
  Body,
  Put,
  OnUndefined,
  Delete,
  QueryParams,
  OnNull,
  Authorized,
  CurrentUser,
} from 'routing-controllers';

import {
  CreateUserProps,
  CreateUserService,
  UpdateUserProps,
  UpdateUserService,
  FindUserService,
  UserQueryParams,
  UserDTO,
} from '@services/user';

import { User } from '@models/user';

import { Page } from '@shared/pagination';
import { Session } from '@shared/auth';
import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';

@JsonController('/users')
export class UsersController {
  constructor(
    private findUserService = new FindUserService(),
    private createUserService = new CreateUserService(),
    private updateUserService = new UpdateUserService(),
    private repository = getRepository(User),
  ) {}

  @Authorized(['ADM'])
  @Get()
  async index(@QueryParams() query: UserQueryParams): Promise<Page<UserDTO>> {
    return this.findUserService.findPage(query);
  }

  @Authorized(['USER'])
  @Get('/:id')
  @OnUndefined(404)
  async show(
    @Param('id') id: number,
    @CurrentUser() session: Session,
  ): Promise<UserDTO> {
    if (session.roles.every(role => role !== 'ADM') && session.id !== id) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Permissão invalida para este recurso.',
      );
    }
    return this.findUserService.findOne(id);
  }

  @Authorized(['USER'])
  @Post()
  async store(
    @Body() user: CreateUserProps,
    @CurrentUser() session: Session,
  ): Promise<User> {
    return this.createUserService.create(user, session);
  }

  @Authorized(['USER'])
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserProps,
    @CurrentUser() session: Session,
  ): Promise<User> {
    if (session.roles.every(role => role !== 'ADM') && session.id !== id) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Permissão invalida para este recurso.',
      );
    }
    return this.updateUserService.update(id, user);
  }

  @Authorized(['ADM'])
  @Delete('/:id')
  @OnUndefined(200)
  @OnNull(404)
  async destroy(@Param('id') id: number): Promise<null | undefined> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    await this.repository.delete(user.id);
    return undefined;
  }
}
