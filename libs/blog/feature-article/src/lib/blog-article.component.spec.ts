import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BlogArticleComponent } from './blog-article.component';
import { ArticleService, Article } from '@valerymelou/blog/data-access';
import { of } from 'rxjs';

describe('BlogArticleComponent', () => {
  let component: BlogArticleComponent;
  let fixture: ComponentFixture<BlogArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticleComponent],
      providers: [
        provideRouter([]),
        {
          provide: ArticleService,
          useValue: {
            getOne: () => of(new Article()),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
