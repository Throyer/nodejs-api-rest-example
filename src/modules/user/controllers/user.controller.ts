import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest } from 'src/http/default-body/bad-request';
import { Conflict } from 'src/http/default-body/conflict';
import { NotFound } from 'src/http/default-body/not-found';
import { Unauthorized } from 'src/http/default-body/unauthorized';
import { Authorize, Session } from 'src/modules/authentication/helpers/session';
import { Authorized } from 'src/modules/authentication/models/authorized';
import { Page } from 'src/shared/pagination/page';
import { CreateUserProps } from '../dtos/create-user-props';
import { PartialUpdateUser } from '../dtos/partial-update-user';
import { extract, UserInformation } from '../dtos/user-information';
import { CreateUserService } from '../services/create-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import { FindAllUsersService } from '../services/find-all-users.service';
import { FindUserService } from '../services/find-user.service';
import { PartialUpdateUserService } from '../services/partial-update-user.service';
import { UserPage } from '../swagger/user-page';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly findAllService: FindAllUsersService,
    private readonly findService: FindUserService,
    private readonly createService: CreateUserService,
    private readonly partialService: PartialUpdateUserService,
    private readonly deleteService: DeleteUserService,
  ) {}

  @Get()
  @Authorize(['ADM'])
  @ApiOperation({ summary: 'List users paginated' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Page of user successfully load',
    type: UserPage,
  })
  @ApiQuery({ name: 'page', required: false, example: '1' })
  @ApiQuery({ name: 'size', required: false, example: '10' })
  async index(
    @Query('page') page?: number,
    @Query('size') size?: number,
  ): Promise<Page<UserInformation>> {
    const content = await this.findAllService.paginate({ page, size });
    return content.map(extract);
  }

  @Get(':id')
  @Authorize(['USER'])
  @ApiOperation({ summary: 'Show user details by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `user info`,
    type: UserInformation,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid body payload',
    type: BadRequest,
  })
  async show(@Param('id') id: number): Promise<UserInformation> {
    const user = await this.findService.find(id);
    return extract(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'user successfully created',
    type: UserPage,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already used',
    type: Conflict,
  })
  async store(@Body() body: CreateUserProps): Promise<UserInformation> {
    const user = await this.createService.create(body);
    return extract(user);
  }

  @Patch(':id')
  @Authorize(['USER'])
  @ApiOperation({ summary: 'Partial update user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user updated successfully',
    type: UserInformation,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid body payload',
    type: BadRequest,
  })
  async partial(
    @Param('id') id: number,
    @Body() body: PartialUpdateUser,
  ): Promise<UserInformation> {
    const user = await this.partialService.update(id, body);
    return extract(user);
  }

  @Authorize()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'user deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found',
    type: NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid permission',
    type: Unauthorized,
  })
  async destroy(
    @Param('id') id: number,
    @Session() authorized: Authorized,
  ): Promise<void> {
    await this.deleteService.delete(id, authorized);
  }
}
