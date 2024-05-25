import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Entry, EntryCollection, EntrySkeletonType } from 'contentful';

import { ContentfulService } from '@valerymelou/cms/contentful';

import { Article } from './article';
import { Results } from './results';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private contentType = 'article';

  constructor(private contentfulService: ContentfulService) {}

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
}
