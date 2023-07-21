import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogHomeComponent } from './blog-home.component';
import {
  Article,
  ArticleService,
  Results,
  Tag,
  TagService,
} from '@vmelou/blog/data-access';
import { of } from 'rxjs';

describe('BlogHomeComponent', () => {
  let component: BlogHomeComponent;
  let fixture: ComponentFixture<BlogHomeComponent>;
  const articles: Results<Article> = {
    items: [
      {
        abstract: 'Welcome to my blog!',
        createdAt: '2023-07-16T12:43:45.844Z',
        slug: 'hello-world',
        tags: [],
        title: 'Hello World',
        updatedAt: '2023-07-16T12:43:45.844Z',
      },
    ],
    limit: 100,
    skip: 0,
    total: 1,
  };
  const tags: Results<Tag> = {
    items: [],
    limit: 100,
    skip: 0,
    total: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BlogHomeComponent],
      providers: [
        { provide: ArticleService, useValue: { get: () => of(articles) } },
        { provide: TagService, useValue: { getAll: () => of(tags) } },
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
