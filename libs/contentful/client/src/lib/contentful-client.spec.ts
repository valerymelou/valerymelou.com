import { TestBed } from '@angular/core/testing';

import { ContentfulClient } from './contentful-client';

describe('ContentfulClient', () => {
  let service: ContentfulClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentfulClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
