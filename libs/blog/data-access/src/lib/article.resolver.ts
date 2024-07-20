import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Article } from './article';
import { ArticleService } from './article.service';

export const articleResolver: ResolveFn<Article> = (route) => {
  const articleService = inject(ArticleService);
  const slug = route.params['slug'].split('-').slice(3).join('-');

  return articleService.getOne(slug);
};
