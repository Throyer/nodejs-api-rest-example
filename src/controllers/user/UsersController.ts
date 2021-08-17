import { HttpStatusError } from '@errors/HttpStatusError';
import { User } from '@models/user/User';
import { CreateUserService } from '@services/user/CreateUserService';
import { FindUserService } from '@services/user/FindUserService';
import { CreateUserProps } from '@services/user/types/CreateUserProps';
import { CreateUserWithSession } from '@services/user/types/CreateUserWithSession';
import { UpdateUserProps } from '@services/user/types/UpdateUserProps';
import { UserDetails } from '@services/user/types/UserDetails';
import { UserQueryParams } from '@services/user/types/UserQueryParams';
import { UpdateUserService } from '@services/user/UpdateUserService';
import { Session } from '@shared/auth';
import { Page } from '@shared/pagination';
import { HttpStatus } from '@shared/web/HttpStatus';
import { Response } from 'express';
import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  QueryParams,
  Res,
} from 'routing-controllers';
import { getRepository } from 'typeorm';

@JsonController('/users')
export class UsersController {
  private findService = new FindUserService();
  private createService = new CreateUserService();
  private updateService = new UpdateUserService();

  private repository = getRepository(User);

  @Authorized(['ADM'])
  @Get()
  async index(
    @QueryParams() query: UserQueryParams,
  ): Promise<Page<UserDetails>> {
    return this.findService.findPage(query);
  }

  @Authorized(['USER'])
  @Get('/:id')
  @OnUndefined(404)
  async show(
    @Param('id') id: number,
    @CurrentUser() session: Session,
  ): Promise<UserDetails> {
    if (session.roles.every(role => role !== 'ADM') && session.id !== id) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Permissão invalida para este recurso.',
      );
    }
    return this.findService.findOne(id);
  }

  @Post()
  async store(@Body() body: CreateUserProps): Promise<CreateUserWithSession> {
    return this.createService.create(body);
  }

  @Authorized(['USER'])
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserProps,
    @CurrentUser() session: Session,
  ): Promise<UpdateUserProps> {
    if (session.roles.every(role => role !== 'ADM') && session.id !== id) {
      throw new HttpStatusError(
        HttpStatus.FORBIDDEN,
        'Permissão invalida para este recurso.',
      );
    }
    return this.updateService.update(id, user);
  }

  @Authorized(['ADM'])
  @Delete('/:id')
  async destroy(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      return response.status(404).send();
    }

    await this.repository.update(user.id, {
      active: false,
      email: null,
      deletedEmail: user.email,
    });

    await this.repository.softDelete(user.id);

    return response.send();
  }
}
