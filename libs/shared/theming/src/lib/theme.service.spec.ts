import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { take } from 'rxjs';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    service.getTheme().subscribe();
  });

  it('should change the theme', (done) => {
    service.getTheme().subscribe({
      next: (theme) => {
        expect(theme).toBe('light');
        expect(service.getPreferredTheme()).toBe('light');
        done();
      },
    });

    service.changeTheme('dark', false);
  });

  it('should reset the theme', (done) => {
    service
      .getTheme()
      .pipe(take(1))
      .subscribe({
        next: (theme) => {
          expect(theme).toBe('light');
          done();
        },
      });

    service.resetPreferredTheme();
  });

  it('should reset the preferred theme', () => {
    service.resetPreferredTheme();
    expect(service.getPreferredTheme()).toBe('light');
  });

  it('should get the preferred theme', () => {
    service.changeTheme('dark', false);
    expect(service.getPreferredTheme()).toBe('dark');
  });
});
