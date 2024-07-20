import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { SocialLinksComponent } from '../social-links/social-links.component';
import { SocialBarComponent } from './social-bar.component';

@Component({
  selector: 'app-social-links',
  template: 'social links works!',
  standalone: true,
})
class SocialLinksStubComponent {}

describe('SocialBarComponent', () => {
  let component: SocialBarComponent;
  let fixture: ComponentFixture<SocialBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialBarComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(SocialBarComponent, {
        add: { imports: [SocialLinksStubComponent] },
        remove: { imports: [SocialLinksComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SocialBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
