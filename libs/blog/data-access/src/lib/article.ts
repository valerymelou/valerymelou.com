import {
  Asset as ContentfulAsset,
  Entry,
  EntrySkeletonType,
  TagLink,
} from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { Asset } from './asset';
import { Tag } from './tag';

export class Article {
  title = '';
  slug = '';
  abstract = '';
  cover?: Asset;
  createdAt = '';
  updatedAt = '';
  publishedAt = '';
  tags: Tag[] = [];
  content!: Document;

  static fromEntry(
    entry: Entry<EntrySkeletonType, undefined, string>,
    assets?: ContentfulAsset[],
  ): Article {
    const article = new Article();
    article.title = entry.fields['title'] as string;
    article.slug = entry.fields['slug'] as string;
    article.abstract = entry.fields['abstract'] as string;
    article.publishedAt = entry.fields['publishedAt'] as string;
    article.createdAt = entry.sys.createdAt;
    article.updatedAt = entry.sys.updatedAt;
    if (entry.fields['cover'] && assets) {
      assets.forEach((asset: ContentfulAsset) => {
        if (
          asset.sys.id === (entry.fields['cover'] as ContentfulAsset).sys.id
        ) {
          article.cover = Asset.fromAsset(asset);
        }
      });
    }

    entry.metadata.tags.forEach((tag: { sys: TagLink }) => {
      article.tags.push({
        id: tag.sys.id,
        label: tag.sys.id
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(),
      });
    });
    article.content = entry.fields['content'] as Document;
    return article;
  }
}
