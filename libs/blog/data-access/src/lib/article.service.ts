import { Injectable } from '@angular/core';
import { ContentfulService } from '@vmelou/cms/contentful';
import { Article } from './article';
import { Observable, map } from 'rxjs';
import { Results } from './results';
import { Entry, EntryCollection, EntrySkeletonType } from 'contentful';

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
              Article.fromEntry(entry, entries.includes?.Asset)
            );
          }
        );

        return results;
      })
    );
  }
}
