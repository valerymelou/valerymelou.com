import { TestBed } from '@angular/core/testing';

import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  let service: MetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataService);
  });

  it('should be created', () => {
    service.updateMetadata({
      title: 'Welcome',
      description: 'Welcome',
    });
    expect(service).toBeTruthy();
  });
});
