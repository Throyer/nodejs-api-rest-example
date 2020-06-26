import { 
    Get,
    QueryParam,
    OnUndefined,
    Param,
    Post,
    Body,
    Put,
    Delete,
    JsonController
} from "routing-controllers";
import { Permissao } from "../models/entities/Permissao";

@JsonController("/permissoes")
export class PermissoesController {

    @Get()
    index(@QueryParam("nome") nome: string) {

        const where: any = {};

        if (nome) {
            where.nome = nome;
        }

        return [];
    }

    @Get("/:id")
    @OnUndefined(404)
    show(@Param("id") id: number) {

        return { message: "Not implemented" };
    }

    @Post()
    async store(@Body() permissao: Permissao) {

        return { message: "Not implemented" };
    }

    @Put("/:id")
    async update(
        @Param("id") id: number,
        @Body() permissao: Permissao
    ) {

        return { message: "Not implemented" };
    }

    @Delete("/:id")
    async destroy(@Param("id") id: number) {
        
        return { message: "Not implemented" };
    }
}