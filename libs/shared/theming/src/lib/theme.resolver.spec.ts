import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { WINDOW_TOKEN, CookiesService } from '@vm/common/browser';

import { themeResolver } from './theme.resolver';
import { ThemeService } from './theme.service';

describe('themeResolver', () => {
  let themeService: ThemeService;
  let cookiesService: jest.Mocked<CookiesService>;

  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => themeResolver(...resolverParameters));

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
        ThemeService,
        { provide: WINDOW_TOKEN, useValue: window },
        { provide: CookiesService, useValue: cookiesServiceMock },
      ],
    });

    themeService = TestBed.inject(ThemeService);
    cookiesService = TestBed.inject(
      CookiesService,
    ) as jest.Mocked<CookiesService>;
  });

  it('should resolve and initialize theme service', () => {
    const result = executeResolver(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
    );

    expect(result).toBe(true);
    expect(themeService).toBeTruthy();
  });

  it('should initialize theme from system preference when no cookie exists', () => {
    cookiesService.getCookie.mockReturnValue(null);

    // Create a new service instance to test initialization
    const newService = TestBed.inject(ThemeService);

    // Should default to light theme in test environment
    expect(newService.getCurrentTheme()).toBe('light');
    expect(cookiesService.setCookie).toHaveBeenCalledWith('theme', 'light');
  });
});
