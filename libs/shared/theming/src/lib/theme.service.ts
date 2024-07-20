import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageService, WINDOW_TOKEN } from '@valerymelou/common/browser';
import { BehaviorSubject } from 'rxjs';

const USE_SYSTEM_THEME_STORAGE_KEY = 'useSystemTheme';
const THEME_STORAGE_KEY = 'theme';
const DARK_MODE_CLASS = 'dark'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeChanged: BehaviorSubject<string> = new BehaviorSubject('light');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW_TOKEN) private window: Window,
    private storage: StorageService
  ) {
    // Only listen to system's theme change if user prefers system's theme
    if (this.shouldUseSystemTheme()) {
      this.setUserPreference(true);
    }
  }

  changeTheme(theme: 'dark' | 'light', system = true) {
    theme === 'dark'
      ? this.addClassToDocument()
      : this.removeClassFromDocument();

    // Indicate that the user has chosen a specific theme, not the system's theme
    if (!system) {
      this.setUserPreference(system);
    }
    this.storage.setItem(THEME_STORAGE_KEY, theme);
    this.themeChanged.next(theme);
  }

  setUserPreference(useSystemTheme: boolean) {
    this.storage.setItem(USE_SYSTEM_THEME_STORAGE_KEY, useSystemTheme.toString());
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
    const useSystemTheme = this.storage.getItem(USE_SYSTEM_THEME_STORAGE_KEY) === 'true';
    const prefersDarkTheme = this.window.matchMedia(
      '(prefers-color-scheme: dark)'
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
