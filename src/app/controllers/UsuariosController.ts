import {
    Get,
    JsonController,
    Param, QueryParam,
    Post,
    Body,
    Put,
    NotFoundError,
    OnUndefined,
    Delete
} from "routing-controllers";

import { getRepository, Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import { Page } from "../shared/Page";

@JsonController("/usuarios")
export class UsuariosController {

    private repository: Repository<Usuario> = getRepository(Usuario);

    @Get()
    async index(@QueryParam("nome") nome: string, @QueryParam("page") page: number, @QueryParam("size") size: number) {

        page = page ?? 1;
        size = size ?? 10;

        const where: any = {};

        const options = {
            skip: (page - 1) * size,
            take: size,
            where
        };

        if (nome) {
            options.where.nome = nome;
        }

        const [content, count] = await this.repository.findAndCount(options);

        return new Page<Usuario>({
            content,
            count,
            page,
            size
        });
    }

    @Get("/:id")
    @OnUndefined(404)
    show(@Param("id") id: number) {

        return this.repository.findOne(id);
    }

    @Post()
    async store(@Body() usuario: Usuario) {

        return this.repository.save(usuario);
    }

    @Put("/:id")
    async update(@Param("id") id: number, @Body() usuario: Usuario) {

        const _usuario = await this.repository.findOne(id);

        if (!_usuario) throw new NotFoundError();

        return this.repository.save(usuario);
    }

    @Delete("/:id")
    async destroy(@Param("id") id: number) {

        return this.repository.delete(id);
    }

}