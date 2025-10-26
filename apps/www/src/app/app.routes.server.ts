import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ArticleService } from '@vm/blog/data-access';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const articleService = inject(ArticleService);
      const articles = await firstValueFrom(articleService.get({}));

      return articles.items.map((article) => {
        return { slug: `${article.url}` };
      });
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
