import {
    getRepository,
    Repository
} from "typeorm";

import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import HttpStatusError from "../errors/HttpStatusError";

import { User } from "../models/User";
import { HttpStatus } from "../shared/HttpStatus";
import { TOKEN_EXPIRATION, TOKEN_SECRET } from "../config";

interface AuthenticationResponse {
    user: User,
    token: string;
}

export class AuthenticationRequest {

    @IsEmail()
    @IsNotEmpty({
        message: 'Informe o email'
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe a senha'
    })
    password: string;
}

export default class AuthenticateUserService {

    repository: Repository<User> = getRepository(User);

    async authenticate({ email, password }: AuthenticationRequest): Promise<AuthenticationResponse> {
        
        const user = await this.repository.findOne({ where: { email }, relations: ["roles"] });

        if (!user) {
            throw new HttpStatusError("Email ou senha incorreto.", HttpStatus.UNAUTHORIZED);
        }

        const match = await compare(password, user.password);

        if (!match) {
            throw new HttpStatusError("Email ou senha incorreto.", HttpStatus.UNAUTHORIZED);
        }
        const roles = user.roles.map(role => role.initials);
    
        const token = sign({ roles }, TOKEN_SECRET, {
            subject: user.id.toString(),
            expiresIn: TOKEN_EXPIRATION,
        })

        delete user.password;
        delete user.roles;

        return {
            user,
            token
        };
    }
}