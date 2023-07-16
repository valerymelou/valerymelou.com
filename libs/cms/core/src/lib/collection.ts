import { BaseEntry } from './base-entry';

export interface Collection<E extends BaseEntry> {
  items: E[];
  total: number;
  skip: number;
  limit: number;
}
