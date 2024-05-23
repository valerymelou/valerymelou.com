import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: '',
  standalone: true,
})
export class AboutComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, AboutComponent],
      providers: [
        provideRouter([{ path: 'about', component: AboutComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle navigation', () => {
    component.toggleNavigation();

    expect(component.showNavigation).toBeTruthy();
  });

  it('should set isAbout to true', fakeAsync(() => {
    router.navigate(['/about']);
    tick();

    expect(component.isAbout).toBeTruthy();
  }));
});
