import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ThemeService } from './theme.service';

export const themeResolver: ResolveFn<boolean> = () => {
  const themeService = inject(ThemeService);
  const preferredTheme = themeService.getPreferredTheme();
  themeService.changeTheme(preferredTheme);

  if (preferredTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return true;
};
