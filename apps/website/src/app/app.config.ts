import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_SPACE,
} from '@valerymelou/cms/contentful';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    { provide: CONTENTFUL_SPACE, useValue: process.env.VM_CONTENTFUL_SPACE },
    {
      provide: CONTENTFUL_ACCESS_TOKEN,
      useValue: process.env.VM_CONTENTFUL_ACCESS_TOKEN,
    },
    {
      provide: CONTENTFUL_ENVIRONMENT,
      useValue: process.env.VM_CONTENTFUL_ENVIRONMENT,
    },
  ],
};
