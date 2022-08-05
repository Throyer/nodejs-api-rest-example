import { BadRequestException } from '@nestjs/common';
import { BadRequest } from 'src/http/default-body/bad-request';
import { FindManyOptions, SelectQueryBuilder } from 'typeorm';
import { Pageable } from './pageable';

const PAGE_MAX_VALUE = 500;

export class Paginator {
  private page: number;
  private size: number;

  constructor({ page, size }: Pageable) {
    this.page = Number.isNaN(page) ? 1 : page ?? 1;
    this.size = Number.isNaN(page) ? 10 : size ?? 10;
  }

  private validate() {
    this.page = Number(this.page);
    this.size = Number(this.size);

    if (Number.isNaN(this.page) || Number.isNaN(this.size)) {
      throw new BadRequestException(
        new BadRequest({
          error: 'Bad request',
          message: ['Erro ao carregar parâmetros de "page" ou "size".'],
          statusCode: 400,
        }),
      );
    }

    if (this.page <= 0) {
      this.page = 1;
    }

    if (this.size <= 1) {
      this.size = 10;
    }

    if (this.size > 500) {
      throw new BadRequestException(
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

  public query<T>(query?: SelectQueryBuilder<T>): Paginator {
    this.validate();
    query.skip((this.page - 1) * this.size);
    query.take(this.size);
    return this;
  }

  public pageable(): Pageable {
    return { page: this.page, size: this.size };
  }
}
