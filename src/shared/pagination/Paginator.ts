import { BadRequestError } from 'routing-controllers';
import { FindManyOptions, SelectQueryBuilder } from 'typeorm';

const PAGE_MAX_VALUE = 500;

export abstract class Paginator {
  page = 1;
  size = 10;

  private validate() {
    this.page = Number(this.page);
    this.size = Number(this.size);

    if (Number.isNaN(this.page) || Number.isNaN(this.size)) {
      throw new BadRequestError(
        'Erro ao carregar parâmetros de "page" ou "size".',
      );
    }

    if (this.page <= 0) {
      this.page = 1;
    }

    if (this.size <= 1) {
      this.size = 10;
    }

    if (this.size > 500) {
      throw new BadRequestError(
        `O Tamanho máximo de uma página é de ${PAGE_MAX_VALUE} elementos.`,
      );
    }
  }

  public paginate<T>(options?: FindManyOptions<T>): FindManyOptions<T> {
    this.validate();
    return {
      ...options,
      skip: (this.page - 1) * this.size,
      take: this.size,
    };
  }

  public paginateQuery<T>(query?: SelectQueryBuilder<T>): void {
    this.validate();
    query.skip((this.page - 1) * this.size);
    query.take(this.size);
  }
}
