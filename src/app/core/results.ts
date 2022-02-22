export interface Results<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}
