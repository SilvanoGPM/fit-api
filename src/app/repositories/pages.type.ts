export interface Pageable {
  page: number;
  size: number;
  sort?: string;
}

export interface Page<T> {
  data: T[];
  hasNext: boolean;
  total: number;
  page: number;
  size: number;
}
