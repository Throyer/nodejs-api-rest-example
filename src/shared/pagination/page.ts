import { Paginator } from './paginator';

export class Page<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;

  constructor(content: T[], count: number, page?: number, size?: number) {
    this.content = content;
    this.page = page;
    this.size = size;
    this.totalPages = Math.ceil(count / size);
    this.totalElements = count;
  }

  public map<U>(callback: (value: T, index: number, array: T[]) => U): Page<U> {
    return new Page(
      this.content.map(callback),
      this.totalElements,
      this.page,
      this.size,
    );
  }

  public static of<E>(content: E[], count: number, paginator: Paginator) {
    const { page, size } = paginator.pageable();
    return new Page<E>(content, count, page, size);
  }
}
