import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ThemeService } from './theme.service';

export const themeResolver: ResolveFn<boolean> = () => {
  inject(ThemeService);

  return true;
};
