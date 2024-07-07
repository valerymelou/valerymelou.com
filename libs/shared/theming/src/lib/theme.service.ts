import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeChanged: BehaviorSubject<string> = new BehaviorSubject('light');

  constructor() {
    // Only listen to system's theme change if user prefers system's theme
    if (this.shouldUseSystemTheme()) {
      this.setUserPreference(true);
    }
  }

  changeTheme(theme: 'dark' | 'light', system = true) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage['theme'] = theme;
    // Indicate that the user has chosen a specific theme, not the system's theme
    if (!system) {
      this.setUserPreference(system);
    }
    this.themeChanged.next(theme);
  }

  setUserPreference(useSystemTheme: boolean) {
    localStorage['useSystemTheme'] = useSystemTheme.toString();
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', (e) => {
        this.changeTheme(e.matches ? 'dark' : 'light');
      });
    if (useSystemTheme) {
      this.changeTheme(this.getPreferredTheme());
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          this.changeTheme(e.matches ? 'dark' : 'light');
        });
    }
  }

  resetPreferredTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
    this.setUserPreference(true);
  }

  getTheme() {
    return this.themeChanged;
  }

  getPreferredTheme(): 'dark' | 'light' {
    const useSystemTheme = localStorage['useSystemTheme'] === 'true';
    const prefersDarkTheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (useSystemTheme) {
      return prefersDarkTheme ? 'dark' : 'light';
    }

    const storedTheme = localStorage['theme'];

    if (storedTheme === 'dark' || (!storedTheme && prefersDarkTheme)) {
      return 'dark';
    }

    return 'light';
  }

  private shouldUseSystemTheme(): boolean {
    // Check if the user has a preference set for using the system's theme
    return (
      localStorage['useSystemTheme'] === 'true' ||
      !('useSystemTheme' in localStorage)
    );
  }
}
