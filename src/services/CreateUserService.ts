import { hash } from "bcryptjs";
import { getRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { HttpStatus } from "../shared/HttpStatus";

import HttpStatusError from "../errors/HttpStatusError";
import { IsArray, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

class RoleDTO {

    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class CreateUserProps {
    
    @IsNotEmpty({ message: 'Informe um nome.' })
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsNotEmpty({ message: 'Informe uma senha.' })
    password: string;

    @IsArray()
    roles: RoleDTO[]
}

export default class CreateUserService {

    repository: Repository<User> = getRepository(User);

    async create({ name, email, password, roles }: CreateUserProps): Promise<User> {

        const exists = await this.repository.findOne({
            where: { email }
        });

        if (exists) {
            throw new HttpStatusError(
                HttpStatus.BAD_REQUEST,
                'Email já utilizado.'
            );
        }

        const user = await this.repository.save({
            name,
            email,
            password: await hash(password, 8),
            roles
        });

        delete user.password;

        return user;
    }
}