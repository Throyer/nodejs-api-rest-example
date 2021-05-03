import { FindManyOptions } from 'typeorm';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export abstract class Paginator {
  @IsNumber(
    { allowInfinity: false },
    {
      message: 'Parametro de page invalido.',
    },
  )
  @Min(1, { message: 'O parametro page deve ser maior ou igual 1.' })
  @IsOptional()
  page = 1;

  @IsNumber(
    { allowInfinity: false },
    {
      message: 'Parametro de size invalido.',
    },
  )
  @Max(500, { message: 'O Tamanho maximo de uma página é de 500 elementos.' })
  @IsOptional()
  size = 10;

  paginate<T>(options?: FindManyOptions<T>): FindManyOptions<T> {
    this.page = Number(this.page);
    this.size = Number(this.size);

    if (Number.isNaN(this.page) || Number.isNaN(this.size)) {
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
