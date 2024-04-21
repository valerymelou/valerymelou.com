import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeChanged: BehaviorSubject<string> = new BehaviorSubject('light');

  changeTheme(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage['theme'] = theme;
    this.themeChanged.next(theme);
  }

  resetPreferredTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
    this.changeTheme(this.getPreferredTheme());
  }

  getTheme() {
    return this.themeChanged;
  }

  getPreferredTheme(): 'dark' | 'light' {
    if (
      localStorage['theme'] === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark';
    }

    return 'light';
  }
}
