import { Route } from '@angular/router';
import { BaseLayoutComponent } from '@valerymelou/shared/layout';
import { themeResolver } from '@valerymelou/core/theming';

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
      },
      {
        path: 'about',
        loadComponent: () =>
          import('@valerymelou/pages/about').then((c) => c.AboutComponent),
      },
    ],
  },
];
