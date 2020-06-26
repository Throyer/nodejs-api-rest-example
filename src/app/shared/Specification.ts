import { FindManyOptions } from 'typeorm'

export default interface Specification<T> {

    getOptions(): FindManyOptions<T>
}
