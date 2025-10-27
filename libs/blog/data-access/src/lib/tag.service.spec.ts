import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { TagCollection } from 'contentful';
import { of } from 'rxjs';
import { ContentfulService } from '@vm/cms/contentful';
import { Results } from './results';
import { Tag } from './tag';

describe('TagService', () => {
  let service: TagService;
  const tags: TagCollection = {
    total: 1,
    skip: 0,
    limit: 100,
    items: [
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'space',
            },
          },
          id: 'django',
          type: 'Tag',
          createdAt: '2022-02-21T16:31:29.765Z',
          updatedAt: '2022-02-21T16:31:29.765Z',
          environment: {
            sys: {
              id: 'staging',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '4up3TfP0Xz6oJ44I32FFk8',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '4up3TfP0Xz6oJ44I32FFk8',
            },
          },
          version: 1,
          visibility: 'public',
        },
        name: 'Django',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ContentfulService, useValue: { getTags: () => of(tags) } },
      ],
    });
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tags', () => {
    service.getAll().subscribe((tags: Results<Tag>) => {
      expect(tags.items.length).toEqual(1);
    });
  });
});
