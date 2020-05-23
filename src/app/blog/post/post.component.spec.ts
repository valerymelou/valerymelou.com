import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockHeroComponent } from 'src/testing/mock-hero.component';
import { MockScullyContentComponent } from 'src/testing/mock-scully-content.component';
import { PostComponent } from './post.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ScullyRoutesService } from '@scullyio/ng-lib';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({slug: 'blog/sample-post'})
          }
        },
        {
          provide: ScullyRoutesService,
          useValue: {
            available$: of([{
              route: 'blog/sample-post'
            }])
          }
        }
      ],
      declarations: [ PostComponent, MockHeroComponent, MockScullyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return page ID', () => {
    expect(component.getPageId()).toBe(window.location.pathname);
  });

  it('should return canonical URL', () => {
    expect(component.getCanonicalUrl()).toBe(window.location.href);
  });
});
