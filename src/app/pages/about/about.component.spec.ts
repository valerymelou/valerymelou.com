import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockHeroComponent } from 'src/testing/mock-hero.component';
import { MockSocialLinksComponent } from 'src/testing/mock-social-links.component';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent, MockHeroComponent, MockSocialLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
