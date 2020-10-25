import { NotFoundError } from "routing-controllers";
import { getRepository, Repository } from "typeorm";
import { Role } from "../models/Role";
import { User } from "../models/User";

export interface UpdateUserProps {
    id: number;
    name: string;
    email: string;
    roles: Role[]
}

export default class UpdateUserService {

    repository: Repository<User> = getRepository(User);

    async update({ id, ...partial }: UpdateUserProps): Promise<User> {

		const user = await this.repository.findOne({ where: { id } });

		if (!user) throw new NotFoundError();

		this.repository.merge(user, partial);

		const updated = await this.repository.save(user);

		return updated;
    }
}