import { FindManyOptions } from 'typeorm'

export default interface Specification<T> {

    paginate(options?: FindManyOptions<T>): FindManyOptions<T>
}
