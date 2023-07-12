import { Inject, Injectable } from '@angular/core';
import { ContentfulClientApi, createClient } from 'contentful';
import { from } from 'rxjs';
import { CONTENTFUL_SPACE, CONTENTFUL_ACCESS_TOKEN } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class ContentfulClient {
  private cdaClient: ContentfulClientApi<undefined>;

  constructor(
    @Inject(CONTENTFUL_SPACE) space: string,
    @Inject(CONTENTFUL_ACCESS_TOKEN) accessToken: string
  ) {
    this.cdaClient = createClient({
      space,
      accessToken,
    });
  }

  get(contentTypeId: string, query: object) {
    return from(
      this.cdaClient.getEntries(
        Object.assign(
          {
            content_type: contentTypeId,
          },
          query
        )
      )
    );
  }
}
