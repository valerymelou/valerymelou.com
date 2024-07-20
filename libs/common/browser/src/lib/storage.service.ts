import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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
