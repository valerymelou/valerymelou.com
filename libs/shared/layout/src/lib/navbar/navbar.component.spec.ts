import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle navigation', () => {
    component.toggleNavigation();

    expect(component.showNavigation).toBeTruthy();
  });

  it('should change the theme', () => {
    component.changeTheme('dark');

    expect(component.theme).toBe('dark');
  });

  // TODO: fix this test
  // it('should reset theme to preferred theme', () => {
  //   component.resetTheme();

  //   expect(component.theme).toBe('light');
  // });
});
