import { TestBed } from '@angular/core/testing';
import { themeResolver } from './theme.resolver';
import { ThemeService } from './theme.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { WINDOW_TOKEN } from '@valerymelou/common/browser';

describe('themeResolver', () => {
  let themeService: ThemeService;
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => themeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: WINDOW_TOKEN, useValue: window }],
    });
    themeService = TestBed.inject(ThemeService);
  });

  it('should change the theme based on the preferred theme', () => {
    jest.spyOn(themeService, 'getPreferredTheme').mockReturnValue('dark');
    jest.spyOn(themeService, 'changeTheme');

    executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(themeService.changeTheme).toHaveBeenCalledWith('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should remove the "dark" class from documentElement when the preferred theme is not "dark"', () => {
    jest.spyOn(themeService, 'getPreferredTheme').mockReturnValue('light');
    jest.spyOn(themeService, 'changeTheme');

    executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(themeService.changeTheme).toHaveBeenCalledWith('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
