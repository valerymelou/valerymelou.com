import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import {
  CONTENTFUL_SPACE,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
} from '@valerymelou/cms/contentful';
import { WINDOW_TOKEN } from '@valerymelou/common/browser';

import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideRouter(appRoutes),
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
