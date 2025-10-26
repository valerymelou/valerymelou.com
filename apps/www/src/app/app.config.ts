import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withJsonpSupport,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideNgIconLoader } from '@ng-icons/core';
import { WINDOW_TOKEN } from '@vm/common/browser';

import { appRoutes } from './app.routes';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_SPACE,
} from '@vm/cms/contentful';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withJsonpSupport()),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideNgIconLoader((name) => {
      const http = inject(HttpClient);
      return http.get(`/icons/${name}.svg`, { responseType: 'text' });
    }),
    {
      provide: WINDOW_TOKEN,
      useFactory: () => {
        if (typeof window !== 'undefined') {
          return window;
        }

        return {
          matchMedia: () => ({
            removeEventListener: () => true,
            addEventListener: () => true,
            matches: true,
          }),
          location: {
            origin:
              process.env['VM_CONTENTFUL_ENVIRONMENT'] === 'master'
                ? 'https://valerymelou.com'
                : 'https://staging.valerymelou.com/',
            href: '',
          },
        };
      },
    },
    { provide: CONTENTFUL_SPACE, useValue: process.env['VM_CONTENTFUL_SPACE'] },
    {
      provide: CONTENTFUL_ACCESS_TOKEN,
      useValue: process.env['VM_CONTENTFUL_ACCESS_TOKEN'],
    },
    {
      provide: CONTENTFUL_ENVIRONMENT,
      useValue: process.env['VM_CONTENTFUL_ENVIRONMENT'],
    },
  ],
};
