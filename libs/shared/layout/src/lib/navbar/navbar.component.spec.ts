import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-social-links',
  template: 'social links works!',
  standalone: true,
})
class SocialLinksStubComponent {}

@Component({
  selector: 'app-about',
  template: 'about works!',
  standalone: true,
})
class AboutStubComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, AboutStubComponent],
      providers: [
        provideRouter([{ path: 'about', component: AboutStubComponent }]),
      ],
    })
      .overrideComponent(NavbarComponent, {
        add: { imports: [SocialLinksStubComponent] },
        remove: { imports: [SocialLinksComponent] },
      })
      .compileComponents();

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
