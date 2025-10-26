import { TestBed } from '@angular/core/testing';

import { WINDOW_TOKEN } from '@vm/common/browser';

import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  let service: MetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW_TOKEN, useValue: window }],
    });
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
