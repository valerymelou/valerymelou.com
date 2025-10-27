import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private platformId = inject(PLATFORM_ID);
  private request = inject(REQUEST, { optional: true });

  getItem(key: string): string | null {
    return this.getCookie(key);
  }

  setItem(
    key: string,
    value: string,
    options?: {
      maxAge?: number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Strict' | 'Lax' | 'None';
    }
  ): void {
    this.setCookie(key, value, options);
  }

  removeItem(key: string, path = '/'): void {
    this.removeCookie(key, path);
  }

  clear(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Get all cookies and remove them
    const cookies = this.getAllCookies();
    Object.keys(cookies).forEach((key) => {
      this.removeCookie(key);
    });
  }

  getCookie(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const cookies = this.parseCookies(document.cookie);
      return cookies[key] || null;
    }

    if (!this.request) return null;

    // On server, get from request headers
    const cookieHeader = this.request.headers.get('Cookie');
    if (!cookieHeader) return null;

    const cookies = this.parseCookies(cookieHeader);
    return cookies[key] || null;
  }

  setCookie(
    key: string,
    value: string,
    options: {
      maxAge?: number;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const {
      maxAge = 7 * 24 * 60 * 60, // 7 days in seconds
      path = '/',
      secure = true,
      sameSite = 'Lax',
    } = options;

    let cookieString = `${key}=${encodeURIComponent(value)}; Path=${path}`;

    if (maxAge) {
      cookieString += `; Max-Age=${maxAge}`;
    }

    if (secure) {
      cookieString += '; Secure';
    }

    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`;
    }

    document.cookie = cookieString;
  }

  removeCookie(key: string, path = '/'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.cookie = `${key}=; Path=${path}; Max-Age=0`;
  }

  getAllCookies(): { [key: string]: string } {
    if (isPlatformBrowser(this.platformId)) {
      return this.parseCookies(document.cookie);
    }

    const cookieHeader = this.request?.headers?.get('Cookie');
    if (cookieHeader) {
      return this.parseCookies(cookieHeader);
    }

    return {};
  }

  private parseCookies(cookieString: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};

    if (!cookieString) return cookies;

    cookieString.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=', 2);
      if (name !== undefined && value !== undefined) {
        cookies[name] = decodeURIComponent(value);
      }
    });

    return cookies;
  }
}
