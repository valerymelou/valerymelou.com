import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_SPACE,
} from '@vmelou/cms/contentful';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: CONTENTFUL_SPACE,
      useValue: process.env['NX_CONTENTFUL_SPACE'],
    },
    {
      provide: CONTENTFUL_ACCESS_TOKEN,
      useValue: process.env['NX_CONTENTFUL_ACCESS_TOKEN'],
    },
    {
      provide: CONTENTFUL_ENVIRONMENT,
      useValue: process.env['NX_CONTENTFUL_ENVIRONMENT'],
    },
  ],
};
