import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should get and set the values in storage', () => {
    service.setItem('test', 'testValue');

    expect(service.getItem('test')).toEqual('testValue');
  });

  it('should remove the value from storage', () => {
    service.setItem('test', 'testValue');
    service.removeItem('test');

    expect(service.getItem('test')).toBeNull();
  })

  it('should clear the storage', () => {
    service.clear();

    expect(service.getItem('test')).toBeNull();
  });
});
