import { FindManyOptions } from 'typeorm';

export interface Specification<T> {
  paginate(options?: FindManyOptions<T>): FindManyOptions<T>;
}
