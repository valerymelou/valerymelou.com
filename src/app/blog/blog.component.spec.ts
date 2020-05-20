import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockHeroComponent } from 'src/testing/mock-hero.component';
import { MockScullyContentComponent } from 'src/testing/mock-scully-content.component';
import { SlugifyPipe } from '../shared/pipes/slugify.pipe';

import { BlogComponent } from './blog.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        SlugifyPipe,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              topic: 'django'
            }),
            paramMap: of({})
          }
        }
      ],
      declarations: [ BlogComponent, MockHeroComponent, MockScullyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
