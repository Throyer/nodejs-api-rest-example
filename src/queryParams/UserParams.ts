import { FindManyOptions, Like, FindConditions } from "typeorm";
import Specification from "../shared/Specification";
import { User } from "../entities/User";
import Paginator from "../shared/Paginator";

export default class UserParams extends Paginator

	implements Specification<User> {
	name?: string;

	getOptions(): FindManyOptions<User> {
		const where: FindConditions<User> = {};

		if (this.name) {
			where.name = Like(`%${this.name}%`);
		}

		return this.paginate({
			where
		});
	}
}
