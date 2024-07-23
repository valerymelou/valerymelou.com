import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { of } from 'rxjs';

import { Article } from './article';
import { articleResolver } from './article.resolver';
import { ArticleService } from './article.service';

describe('articleResolver', () => {
  const executeResolver: ResolveFn<Article> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => articleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ArticleService,
          useValue: { getOne: () => of(new Article()) },
        },
      ],
    });
  });

  it('should get the article', () => {
    const route: unknown = { params: { slug: '2024-07-20-test-article' } };
    const articleService = TestBed.inject(ArticleService);
    const getOneSpy = jest.spyOn(articleService, 'getOne');

    executeResolver(route as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(getOneSpy).toHaveBeenCalledWith('test-article');
  });
});
