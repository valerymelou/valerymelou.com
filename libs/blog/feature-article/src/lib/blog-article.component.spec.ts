import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { of } from 'rxjs';

import { ArticleService, Article } from '@valerymelou/blog/data-access';
import { MetadataService } from '@valerymelou/shared/seo';

import { BlogArticleComponent } from './blog-article.component';

describe('BlogArticleComponent', () => {
  let component: BlogArticleComponent;
  let fixture: ComponentFixture<BlogArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticleComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ slug: 'test' }),
          },
        },
        {
          provide: ArticleService,
          useValue: {
            getOne: () => of(new Article()),
          },
        },
        {
          provide: MetadataService,
          useValue: { updateMetadata: () => true },
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
