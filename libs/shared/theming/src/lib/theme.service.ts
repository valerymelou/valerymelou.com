import { Injectable, DOCUMENT, inject } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { CookiesService, WINDOW_TOKEN } from '@vm/common/browser';

const THEME_STORAGE_KEY = 'theme';
const DARK_MODE_CLASS = 'dark';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeChanged: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    'light',
  );

  private document = inject(DOCUMENT);
  private window = inject(WINDOW_TOKEN);
  private cookiesService = inject(CookiesService);

  constructor() {
    // Initialize theme on service creation
    this.initializeTheme();
  }

  /**
   * Changes the current theme and stores it in cookies
   */
  changeTheme(theme: Theme): void {
    this.applyTheme(theme);
    this.cookiesService.setCookie(THEME_STORAGE_KEY, theme);
    this.themeChanged.next(theme);
  }

  /**
   * Gets the current theme as an observable
   */
  getTheme() {
    return this.themeChanged;
  }

  /**
   * Gets the current theme value
   */
  getCurrentTheme(): Theme {
    return this.themeChanged.value;
  }

  /**
   * Resets the theme to system preference and removes stored cookie
   */
  resetToSystemTheme(): void {
    const systemTheme = this.getSystemPreferredTheme();
    this.applyTheme(systemTheme);
    this.cookiesService.setCookie(THEME_STORAGE_KEY, systemTheme);
    this.themeChanged.next(systemTheme);
  }

  /**
   * Initializes the theme by checking cookies first, then system preference
   */
  private initializeTheme(): void {
    const storedTheme = this.cookiesService.getCookie(
      THEME_STORAGE_KEY,
    ) as Theme;

    let themeToUse: Theme;

    if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) {
      // Use theme from cookies if present and valid
      themeToUse = storedTheme;
    } else {
      // Fall back to system preference
      themeToUse = this.getSystemPreferredTheme();
      // Store the system preference for future use
      this.cookiesService.setCookie(THEME_STORAGE_KEY, themeToUse);
    }

    this.applyTheme(themeToUse);
    this.themeChanged.next(themeToUse);
  }

  /**
   * Gets the system's preferred theme
   */
  private getSystemPreferredTheme(): Theme {
    const prefersDarkTheme = this.window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDarkTheme ? 'dark' : 'light';
  }

  /**
   * Applies the theme by adding/removing CSS classes
   */
  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      this.document.documentElement.classList.add(DARK_MODE_CLASS);
    } else {
      this.document.documentElement.classList.remove(DARK_MODE_CLASS);
    }
  }
}
