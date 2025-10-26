import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { of } from 'rxjs';
import { ThemeService } from '@vm/shared/theming';
import { WINDOW_TOKEN } from '@vm/common/browser';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        {
          provide: ThemeService,
          useValue: {
            changeTheme: (theme: string) => theme,
            getTheme: () => of('dark'),
          },
        },
        { provide: WINDOW_TOKEN, useValue: window },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
