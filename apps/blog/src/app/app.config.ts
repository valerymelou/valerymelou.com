import { ApplicationConfig } from '@angular/core';
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_SPACE,
} from '@vmelou/contentful/client';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: CONTENTFUL_SPACE,
      useValue: process.env['NX_CONTENTFUL_SPACE'],
    },
    {
      provide: CONTENTFUL_ACCESS_TOKEN,
      useValue: process.env['NX_CONTENTFUL_ACCESS_TOKEN'],
    },
  ],
};
