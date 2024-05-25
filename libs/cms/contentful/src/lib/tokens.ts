import { InjectionToken } from '@angular/core';

export const CONTENTFUL_SPACE = new InjectionToken<string>('Contentful space');
export const CONTENTFUL_ACCESS_TOKEN = new InjectionToken<string>(
  'Contentful access token'
);
export const CONTENTFUL_ENVIRONMENT = new InjectionToken<string>(
  'Contentful environment'
);
