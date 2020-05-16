export class Page<T> {
    content: T[]
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;

    constructor(
        {
            content,
            count,
            page,
            size
        }:
            {
                content: T[],
                count: number,
                page: number,
                size: number
            }
    ) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalPages = Math.ceil(count / size)
        this.totalElements = count;
    }
}