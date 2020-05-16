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

@JsonController("/usuarios")
export class UsuariosController {

    private repository: Repository<Usuario> = getRepository(Usuario);

    @Get()
    index(@QueryParam("nome") nome: string) {

        const where: any = {};

        if (nome) {
            where.nome = nome;
        }
        
        return this.repository.find({ where });
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