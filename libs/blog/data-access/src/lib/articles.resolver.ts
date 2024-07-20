import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Article } from './article';
import { Results } from './results';
import { ArticleService } from './article.service';

export const articlesResolver: ResolveFn<Results<Article>> = () => {
  const articleService = inject(ArticleService);

  return articleService.get({});
};
