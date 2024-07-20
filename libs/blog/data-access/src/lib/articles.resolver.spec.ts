import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { articlesResolver } from './articles.resolver';
import { Results } from './results';
import { Article } from './article';

describe('articlesResolver', () => {
  const executeResolver: ResolveFn<Results<Article>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      articlesResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
