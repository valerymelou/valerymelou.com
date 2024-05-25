import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  ContentfulClientApi,
  EntryCollection,
  EntrySkeletonType,
  TagCollection,
  createClient,
} from 'contentful';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_SPACE,
} from './tokens';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private cdaClient: ContentfulClientApi<undefined>;

  constructor() {
    const space = inject(CONTENTFUL_SPACE);
    const accessToken = inject(CONTENTFUL_ACCESS_TOKEN);
    const environment = inject(CONTENTFUL_ENVIRONMENT);
    this.cdaClient = createClient({ space, accessToken, environment });
  }

  /**
   * Query the contentful content type and return an observable of corresponding entries.
   *
   * @param contentType The Contentful content type to get the entries of
   * @param query Query to filter the entries
   * @returns Observable of EntryCollection
   */
  getEntries(
    contentType: string,
    query?: { [key: string]: string },
  ): Observable<EntryCollection<EntrySkeletonType, undefined, string>> {
    let defaultQuery: { [key: string]: string } = {
      content_type: contentType,
      limit: '10',
      skip: '0',
      order: '-sys.createdAt',
    };
    defaultQuery = Object.assign(defaultQuery, query);

    return from(
      this.cdaClient
        .getEntries(defaultQuery)
        .then(
          (entries: EntryCollection<EntrySkeletonType, undefined, string>) => {
            return entries;
          },
        ),
    );
  }

  /**
   * Returns an observable of Contentful tags.
   *
   * @returns Observable of TagCollection
   */
  getTags(): Observable<TagCollection> {
    return from(
      this.cdaClient.getTags().then((tags: TagCollection) => {
        return tags;
      }),
    );
  }
}
