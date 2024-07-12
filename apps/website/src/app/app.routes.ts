import { Route } from '@angular/router';
import { BaseLayoutComponent } from '@valerymelou/shared/layout';
import { themeResolver } from '@valerymelou/shared/theming';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayoutComponent,
    resolve: {
      theme: themeResolver,
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@valerymelou/pages/home').then((c) => c.HomeComponent),
        data: { animation: 'HomePage' },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('@valerymelou/pages/about').then((c) => c.AboutComponent),
        data: { animation: 'AboutPage' },
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('@valerymelou/pages/projects').then(
            (c) => c.ProjectsComponent,
          ),
        data: { animation: 'ProjectsPage' },
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('@valerymelou/blog/home').then((c) => c.BlogHomeComponent),
        data: { animation: 'BlogHomePage' },
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('@valerymelou/blog/article').then(
            (c) => c.BlogArticleComponent,
          ),
        data: { animation: 'BlogHomePage' },
      },
    ],
  },
];
