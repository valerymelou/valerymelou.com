// Mock ESM-only dependency used by shared Code component to avoid Jest ESM parse issues
jest.mock('shiki', () => ({
  codeToHtml: jest.fn().mockResolvedValue('<pre></pre>'),
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MetadataService } from '@vm/shared/seo';
import { ThemeService } from '@vm/shared/theming';
import { WINDOW_TOKEN } from '@vm/common/browser';
import { Article } from './article';

describe('Article', () => {
  let component: Article;
  let fixture: ComponentFixture<Article>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Article],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              article: {
                title: 'Test',
                abstract: 'Abstract',
                cover: null,
                url: 'test-article',
              },
            }),
          },
        },
        { provide: MetadataService, useValue: { updateMetadata: jest.fn() } },
        { provide: ThemeService, useValue: { getTheme: () => of('light') } },
        { provide: WINDOW_TOKEN, useValue: window },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Article);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
