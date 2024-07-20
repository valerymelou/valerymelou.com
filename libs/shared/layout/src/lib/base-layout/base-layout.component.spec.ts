import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { BaseLayoutComponent } from './base-layout.component';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SocialBarComponent } from '../social-bar/social-bar.component';

@Component({
  selector: 'app-navbar',
  template: 'navbar works!',
  standalone: true,
})
class NavbarStubComponent {}

@Component({
  selector: 'app-social-bar',
  template: 'social bar works!',
  standalone: true,
})
class SocialBarStubComponent {}

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLayoutComponent, NoopAnimationsModule],
      providers: [provideRouter([])],
    })
      .overrideComponent(BaseLayoutComponent, {
        add: { imports: [NavbarStubComponent, SocialBarStubComponent] },
        remove: { imports: [NavbarComponent, SocialBarComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
