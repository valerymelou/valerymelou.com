import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);

  getItem(key: string): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(key)
      : null;
  }

  setItem(key: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(key);
  }

  clear(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.clear();
  }
}
