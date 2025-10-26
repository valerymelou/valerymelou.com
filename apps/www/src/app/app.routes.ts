import { Route } from '@angular/router';
import { articleResolver, articlesResolver } from '@vm/blog/data-access';

import { Layout, SkeletonType } from '@vm/shared/layout';
import { themeResolver } from '@vm/shared/theming';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Layout,
    resolve: {
      theme: themeResolver,
    },
    children: [
      {
        path: '',
        loadComponent: () => import('@vm/pages/home').then((c) => c.About),
        data: { skeleton: SkeletonType.ABOUT },
      },
      {
        path: 'about',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'projects',
        loadComponent: () => import('@vm/pages/work').then((c) => c.Projects),
        data: { skeleton: SkeletonType.WORK },
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('@vm/blog/feature-home').then((c) => c.Articles),
        data: { skeleton: SkeletonType.ARTICLES },
        resolve: {
          articles: articlesResolver,
        },
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('@vm/blog/feature-article').then((c) => c.Article),
        data: { child: true },
        resolve: {
          article: articleResolver,
        },
      },
    ],
  },
];
