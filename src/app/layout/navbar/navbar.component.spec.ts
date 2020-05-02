import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MockSocialLinksComponent } from 'src/testing/mock-social-links.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavbarComponent, MockSocialLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have `collapsed` set to false', () => {
    expect(component.collapsed).toBeTrue();
  });

  it('should toggle the navigation', () => {
    const navbarToggler = debugElement.query(By.css('.navbar-toggler'));
    navbarToggler.triggerEventHandler('click', null);

    expect(component.collapsed).toBeFalse();
  });
});
