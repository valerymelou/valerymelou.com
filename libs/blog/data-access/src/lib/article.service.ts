import { inject, Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Entry, EntryCollection, EntrySkeletonType } from 'contentful';

import { ContentfulService } from '@vm/cms/contentful';

import { Article } from './article';
import { Results } from './results';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly contentfulService = inject(ContentfulService);
  private contentType = 'article';

  get(query: { [key: string]: string }): Observable<Results<Article>> {
    return this.contentfulService.getEntries(this.contentType, query).pipe(
      map((entries: EntryCollection<EntrySkeletonType, undefined, string>) => {
        const results: Results<Article> = {
          items: [],
          skip: entries.skip,
          total: entries.total,
          limit: entries.limit,
        };

        entries.items.forEach(
          (entry: Entry<EntrySkeletonType, undefined, string>) => {
            results.items.push(
              Article.fromEntry(entry, entries.includes?.Asset),
            );
          },
        );

        return results;
      }),
    );
  }

  getOne(slug: string): Observable<Article> {
    return this.contentfulService
      .getEntries(this.contentType, { 'fields.slug[match]': slug })
      .pipe(
        map(
          (entries: EntryCollection<EntrySkeletonType, undefined, string>) => {
            if (entries.items.length === 0) {
              throw new Error('Article not found');
            }

            return Article.fromEntry(entries.items[0], entries.includes?.Asset);
          },
        ),
      );
  }
}
