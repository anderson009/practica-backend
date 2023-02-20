export interface ResultPaginate<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
