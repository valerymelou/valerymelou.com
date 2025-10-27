import { TestBed } from '@angular/core/testing';

import { take } from 'rxjs';

import { WINDOW_TOKEN, CookiesService } from '@vm/common/browser';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let cookiesService: jest.Mocked<CookiesService>;

  beforeEach(() => {
    const cookiesServiceMock = {
      getCookie: jest.fn(),
      setCookie: jest.fn(),
      removeCookie: jest.fn(),
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      getAllCookies: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW_TOKEN, useValue: window },
        { provide: CookiesService, useValue: cookiesServiceMock },
      ],
    });

    cookiesService = TestBed.inject(
      CookiesService,
    ) as jest.Mocked<CookiesService>;
    service = TestBed.inject(ThemeService);
  });

  it('should change the theme', (done) => {
    service.changeTheme('dark');

    service
      .getTheme()
      .pipe(take(1))
      .subscribe({
        next: (theme) => {
          expect(theme).toBe('dark');
          expect(service.getCurrentTheme()).toBe('dark');
          expect(cookiesService.setCookie).toHaveBeenCalledWith(
            'theme',
            'dark',
          );
          done();
        },
      });
  });

  it('should reset the theme to system preference', (done) => {
    service.resetToSystemTheme();

    service
      .getTheme()
      .pipe(take(1))
      .subscribe({
        next: (theme) => {
          expect(theme).toBe('light'); // Assuming system preference is light in test environment
          expect(cookiesService.setCookie).toHaveBeenCalledWith(
            'theme',
            'light',
          );
          done();
        },
      });
  });

  it('should get the current theme', () => {
    service.changeTheme('dark');
    expect(service.getCurrentTheme()).toBe('dark');

    service.changeTheme('light');
    expect(service.getCurrentTheme()).toBe('light');
  });
});
