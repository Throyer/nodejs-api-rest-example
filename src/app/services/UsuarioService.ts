import { Usuario } from "../models/entities/Usuario";
import UsuarioQueryParams from "../models/queryParameters/UsuarioQueryParams";
import { Page } from "../shared/Page";
import {
  FindManyOptions,
  Repository,
  getRepository,
  FindOneOptions,
  DeepPartial,
} from "typeorm";

export default class UsuarioService {
  constructor(
    private repository: Repository<Usuario> = getRepository(Usuario)
  ) {}

  async find(options?: FindManyOptions<Usuario>): Promise<Usuario[]> {
    return this.repository.find(options);
  }

  async findOne(options?: FindOneOptions<Usuario>): Promise<Usuario> {
    return this.repository.findOne(options);
  }

  async findAndPaginate(pageable: UsuarioQueryParams): Promise<Page<Usuario>> {
    const options = pageable.getOptions();
    const select = await this.repository.findAndCount(options);
    return new Page({ select, pageable });
  }

  async save(usuario: Usuario): Promise<Usuario> {
    return this.repository.save(usuario);
  }

  async update(
    usuario: Usuario,
    partial: DeepPartial<Usuario>
  ): Promise<Usuario> {
    this.repository.merge(usuario, partial);
    return await this.repository.save(usuario);
  }

  async deleteById(id: number): Promise<void> {
    this.repository.delete(id);
  }
}
