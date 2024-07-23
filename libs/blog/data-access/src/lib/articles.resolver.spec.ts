import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { articlesResolver } from './articles.resolver';
import { Results } from './results';
import { Article } from './article';
import { ArticleService } from './article.service';
import { of } from 'rxjs';

describe('articlesResolver', () => {
  const executeResolver: ResolveFn<Results<Article>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      articlesResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ArticleService,
          useValue: {
            get: () => of({ items: [new Article(), new Article()] }),
          },
        },
      ],
    });
  });

  it('should get the articles', () => {
    const articleService = TestBed.inject(ArticleService);
    const getSpy = jest.spyOn(articleService, 'get');

    executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(getSpy).toHaveBeenCalled();
  });
});
