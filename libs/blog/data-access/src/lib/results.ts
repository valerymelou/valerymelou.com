export interface Results<T> {
  items: T[];
  skip: number;
  limit: number;
  total: number;
}
