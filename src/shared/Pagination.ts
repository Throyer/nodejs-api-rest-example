import { FindManyOptions } from "typeorm";

export default abstract class Pagination {

  page: number = 1;
  size: number = 10;

  paginate<T>(options: FindManyOptions<T>): FindManyOptions<T> {
    this.page = Number(this.page);
    this.size = Number(this.size);

    if (isNaN(this.page) || isNaN(this.size)) {
      throw new Error('Erro ao carregar parametros de "page" ou "size".');
    }

    if (this.page <= 0) {
      this.page = 1;
    }

    return {
      ...options,
      skip: (this.page - 1) * this.size,
      take: this.size,
    };
  }
}
