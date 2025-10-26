import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { StorageService, WINDOW_TOKEN } from '@vm/common/browser';
import { BehaviorSubject } from 'rxjs';

const USE_SYSTEM_THEME_STORAGE_KEY = 'useSystemTheme';
const THEME_STORAGE_KEY = 'theme';
const DARK_MODE_CLASS = 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly window = inject(WINDOW_TOKEN);
  private themeChanged: BehaviorSubject<string> = new BehaviorSubject('light');
  private storage = inject(StorageService);

  constructor() {
    if (this.shouldUseSystemTheme()) {
      this.setUserPreference(true);
    }
  }

  changeTheme(theme: 'dark' | 'light', system = true) {
    if (theme === 'dark') {
      this.addClassToDocument();
    } else {
      this.removeClassFromDocument();
    }

    // Indicate that the user has chosen a specific theme, not the system's theme
    if (!system) {
      this.setUserPreference(system);
    }
    this.storage.setItem(THEME_STORAGE_KEY, theme);
    this.themeChanged.next(theme);
  }

  setUserPreference(useSystemTheme: boolean) {
    this.storage.setItem(
      USE_SYSTEM_THEME_STORAGE_KEY,
      useSystemTheme.toString(),
    );
    this.window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.themeChangeListener.bind(this));
    if (useSystemTheme) {
      this.changeTheme(this.getPreferredTheme());
      this.window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.themeChangeListener.bind(this));
    }
  }

  resetPreferredTheme() {
    this.removeClassFromDocument();
    this.storage.removeItem(THEME_STORAGE_KEY);
    this.setUserPreference(true);
  }

  getTheme() {
    return this.themeChanged;
  }

  getPreferredTheme(): 'dark' | 'light' {
    const useSystemTheme =
      this.storage.getItem(USE_SYSTEM_THEME_STORAGE_KEY) === 'true';
    const prefersDarkTheme = this.window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (useSystemTheme) {
      return prefersDarkTheme ? 'dark' : 'light';
    }

    const storedTheme = this.storage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === 'dark' || (!storedTheme && prefersDarkTheme)) {
      return 'dark';
    }

    return 'light';
  }

  private shouldUseSystemTheme(): boolean {
    // Check if the user has a preference set for using the system's theme
    return (
      this.storage.getItem(USE_SYSTEM_THEME_STORAGE_KEY) === 'true' ||
      !this.storage.getItem(USE_SYSTEM_THEME_STORAGE_KEY)
    );
  }

  private addClassToDocument() {
    this.document.documentElement.classList.add(DARK_MODE_CLASS);
  }

  private removeClassFromDocument() {
    this.document.documentElement.classList.remove(DARK_MODE_CLASS);
  }

  private themeChangeListener(e: MediaQueryListEvent) {
    this.changeTheme(e.matches ? 'dark' : 'light');
  }
}
