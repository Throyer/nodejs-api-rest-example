import { hash } from "bcryptjs";
import { getRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { HttpStatus } from "../shared/HttpStatus";

import HttpStatusError from "../errors/HttpStatusError";

export interface CreateUserProps {
    name: string;
    email: string;
    password: string;
    roles: {
        id: number
    }[]
}

export default class CreateUserService {

    repository: Repository<User> = getRepository(User);

    async create({ name, email, password, roles }: CreateUserProps): Promise<User> {

        const exists = await this.repository.findOne({
            where: { email }
        });

        if (exists) {
            throw new HttpStatusError("Email já utilizado.", HttpStatus.BAD_REQUEST);
        }

        const user = await this.repository.save({
            name,
            email,
            password: await hash(password, 8),
            roles
        });

        return user;
    }
}