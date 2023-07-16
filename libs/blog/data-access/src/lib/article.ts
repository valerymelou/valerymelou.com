import { BaseEntry, CmsProperty } from '@vmelou/cms/core';
import { Asset } from './asset';

export class Article extends BaseEntry {
  title = '';
  slug = '';
  abstract = '';
  @CmsProperty('cover', Asset)
  cover: Asset = new Asset();
}
