import { getRepository, Repository } from 'typeorm';
import {
	Get,
	JsonController,
	Param,
	Post,
	Body,
	Put,
	NotFoundError,
	OnUndefined,
	Delete,
	QueryParams
} from 'routing-controllers';

import UserParams from '../queryParams/UserParams';

import CreateUserService, { CreateUserProps } from '../services/CreateUserService';

import { Page } from '../shared/Page';
import { User } from '../models/User';
import { paginate } from '../utils/paginate';
import UpdateUserService from '../services/UpdateUserService';

@JsonController('/users')
export class UsersController {
	
	repository: Repository<User> = getRepository(User);

	createUserService = new CreateUserService();
	updateUserService = new UpdateUserService();

	@Get()
	async index(@QueryParams() pageable: UserParams): Promise<Page<User>> {
		return await paginate(this.repository, pageable);
	}

	@Get('/:id')
	@OnUndefined(404)
	async show(@Param('id') id: number) {
		return await this.repository.findOne({ where: { id } });
	}

	@Post()
	async store(@Body() user: CreateUserProps) {
		return this.createUserService.create(user);
	}

	@Put('/:id')
	async update(@Param('id') id: number, @Body() body: User) {		
		return this.updateUserService.update(body)
	}

	@Delete('/:id')
	@OnUndefined(200)
	async destroy(@Param('id') id: number): Promise<void> {

		const user = await this.repository.findOne({ where: { id } });

		if (!user) throw new NotFoundError();

		await this.repository.delete(user.id);
	}
}
