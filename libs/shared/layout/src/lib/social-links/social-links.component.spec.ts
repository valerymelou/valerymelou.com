import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ThemeService } from '@valerymelou/shared/theming';

import { SocialLinksComponent } from './social-links.component';

describe('SocialLinksComponent', () => {
  let component: SocialLinksComponent;
  let fixture: ComponentFixture<SocialLinksComponent>;
  const theme$ = new BehaviorSubject<string>('light');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinksComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getTheme: () => theme$,
            changeTheme: (theme: string) => theme$.next(theme),
            resetPreferredTheme: () => theme$.next('light'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the theme', () => {
    component.changeTheme('dark');

    expect(component.theme).toBe('dark');
  });

  it('should reset theme to preferred theme', () => {
    component.resetTheme();

    expect(component.theme).toBe('light');
  });
});
