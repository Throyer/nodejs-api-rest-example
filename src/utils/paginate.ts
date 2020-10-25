import { Repository } from "typeorm";
import { Page } from "../shared/Page";
import Paginator from "../shared/Paginator";

export const paginate = async <T> (repository: Repository<T>, pageable: Paginator): Promise<Page<T>> => {

    const options = pageable.paginate<T>();
    const select = await repository.findAndCount(options);
    return new Page({ select, pageable });
}