import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { Article, ArticleService } from '@valerymelou/blog/data-access';

import { BlogHomeComponent } from './blog-home.component';

describe('BlogHomeComponent', () => {
  let component: BlogHomeComponent;
  let fixture: ComponentFixture<BlogHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogHomeComponent],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            get: () => of({ data: [new Article(), new Article()] }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
