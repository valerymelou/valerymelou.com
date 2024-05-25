import { Injectable } from '@angular/core';
import { ContentfulService } from '@valerymelou/cms/contentful';
import { Observable, map } from 'rxjs';
import { Tag } from './tag';
import { Tag as ContentfulTag, TagCollection } from 'contentful';
import { Results } from './results';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private contentfulService: ContentfulService) {}

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
      }),
    );
  }
}
