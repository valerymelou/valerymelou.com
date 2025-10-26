import { inject, Injectable } from '@angular/core';

import { Tag as ContentfulTag, TagCollection } from 'contentful';
import { Observable, map } from 'rxjs';

import { ContentfulService } from '@vm/cms/contentful';

import { Results } from './results';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly contentfulService = inject(ContentfulService);

  getAll(): Observable<Results<Tag>> {
    return this.contentfulService.getTags().pipe(
      map((collection: TagCollection) => {
        const tags: Results<Tag> = {
          items: [],
          limit: 0,
          skip: 0,
          total: 0,
        };
        collection.items.forEach((tag: ContentfulTag) => {
          tags.items.push({
            id: tag.sys.id,
            label: tag.name,
          });
        });
        return tags;
      })
    );
  }
}
