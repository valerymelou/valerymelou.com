import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change the theme', () => {
    service.getTheme().subscribe({
      next: (theme) => {
        expect(theme).toBe('light');
      },
    });

    service.changeTheme('dark');
  });

  it('should reset the theme', () => {
    service.getTheme().subscribe({
      next: (theme) => {
        expect(theme).toBe('light');
      },
    });

    service.resetPreferredTheme();
  });
});
