import { FindManyOptions, Like, FindConditions } from "typeorm";
import Specification from "../../shared/Specification";
import { Usuario } from "../entities/Usuario";
import Pagination from "../../shared/Pagination";

export default class UsuarioQueryParams extends Pagination
  implements Specification<Usuario> {
  nome?: string;

  getOptions(): FindManyOptions<Usuario> {
    const where: FindConditions<Usuario> = {};

    if (this.nome) {
      where.nome = Like(`%${this.nome}%`);
    }

    return this.paginate({
        where
    });
  }
}
