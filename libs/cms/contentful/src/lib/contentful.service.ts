import { inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  ContentfulClientApi,
  Entry,
  EntryCollection,
  EntrySkeletonType,
  createClient,
} from 'contentful';
import { BaseEntry, Collection } from '@vmelou/cms/core';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_SPACE,
} from './tokens';
import { Serializer } from './serializer';

export class ContentfulService<E extends BaseEntry> {
  private cdaClient: ContentfulClientApi<undefined>;
  private serializer: Serializer;

  constructor(
    private readonly cls: new () => E,
    private readonly entryId: string
  ) {
    const space = inject(CONTENTFUL_SPACE);
    const accessToken = inject(CONTENTFUL_ACCESS_TOKEN);
    const environment = inject(CONTENTFUL_ENVIRONMENT);
    this.serializer = new Serializer();
    this.cdaClient = createClient({ space, accessToken, environment });
  }

  getEntries(query?: { [key: string]: string }): Observable<Collection<E>> {
    if (!query) query = {};

    query['content_type'] = this.entryId;

    return from(
      this.cdaClient
        .getEntries(query)
        .then(
          (entries: EntryCollection<EntrySkeletonType, undefined, string>) => {
            const results: Collection<E> = {
              items: [],
              total: entries.total,
              skip: entries.skip,
              limit: entries.limit,
            };

            entries.items.forEach(
              (entry: Entry<EntrySkeletonType, undefined, string>) => {
                results.items.push(this.deserialize(entry));
              }
            );

            console.log(entries);

            return results;
          }
        )
    );
  }

  private deserialize(entry: Entry<EntrySkeletonType, undefined, string>): E {
    return this.serializer.deserialize<E>(this.cls, entry);
  }
}
