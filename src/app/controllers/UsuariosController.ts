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
  QueryParams,
} from "routing-controllers";
import { Usuario } from "../models/entities/Usuario";
import { Page } from "../shared/Page";
import UsuarioQueryParams from "../models/queryParameters/UsuarioQueryParams";
import UsuarioService from "../services/UsuarioService";

@JsonController("/usuarios")
export class UsuariosController {
  constructor(private service: UsuarioService = new UsuarioService()) {}

  @Get()
  async index(
    @QueryParams() params: UsuarioQueryParams
  ): Promise<Page<Usuario>> {
    return await this.service.findAndPaginate(params);
  }

  @Get("/:id")
  @OnUndefined(404)
  async show(@Param("id") id: number) {
    return await this.service.findOne({ where: { id } });
  }

  @Post()
  async store(@Body() usuario: Usuario) {
    return this.service.save(usuario);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: Usuario) {
    const usuario = await this.service.findOne({ where: { id } });

    if (!usuario) throw new NotFoundError();

    const { id: _id, senha: _senha, ...partial } = body;

    const updated = await this.service.update(usuario, partial);

    return updated;
  }

  @Delete("/:id")
  @OnUndefined(200)
  async destroy(@Param("id") id: number): Promise<void> {
    const usuario = await this.service.findOne({ where: { id } });

    if (!usuario) throw new NotFoundError();

    await this.service.deleteById(usuario.id);
  }
}
