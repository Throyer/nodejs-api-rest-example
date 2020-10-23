import { getRepository, Repository } from "typeorm";
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
} from "routing-controllers";

import UserParams from "../models/queryParameters/UserParams";

import { User } from "../models/entities/User";
import { Page } from "../shared/Page";

@JsonController("/users")
export class UsersController {
	
	repository: Repository<User> = getRepository(User);

	@Get()
	async index(@QueryParams() pageable: UserParams): Promise<Page<User>> {
		const options = pageable.paginate();
		const select = await this.repository.findAndCount(options);
		return new Page({ select, pageable })
	}

	@Get("/:id")
	@OnUndefined(404)
	async show(@Param("id") id: number) {
		return await this.repository.findOne({ where: { id } });
	}

	@Post()
	async store(@Body() user: User) {
		return this.repository.save(user);
	}

	@Put("/:id")
	async update(@Param("id") id: number, @Body() body: User) {
		
		const user = await this.repository.findOne({ where: { id } });

		if (!user) throw new NotFoundError();

		const { id: _id, password: _password, ...partial } = body;

		this.repository.merge(user, partial);

		const updated = await this.repository.save(user);

		return updated;
	}

	@Delete("/:id")
	@OnUndefined(200)
	async destroy(@Param("id") id: number): Promise<void> {

		const user = await this.repository.findOne({ where: { id } });

		if (!user) throw new NotFoundError();

		await this.repository.delete(user.id);
	}
}
