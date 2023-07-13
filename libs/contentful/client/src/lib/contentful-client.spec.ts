import { TestBed } from '@angular/core/testing';

import { ContentfulClient } from './contentful-client';
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE } from './tokens';

describe('ContentfulClient', () => {
  let service: ContentfulClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CONTENTFUL_SPACE,
          useValue: 'space',
        },
        {
          provide: CONTENTFUL_ACCESS_TOKEN,
          useValue: 'access token',
        },
      ],
    });
    service = TestBed.inject(ContentfulClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
