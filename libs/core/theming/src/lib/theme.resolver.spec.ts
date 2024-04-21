import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { themeResolver } from './theme.resolver';

describe('themeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => themeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
