import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { Article } from '@valerymelou/blog/data-access';
import { MetadataService } from '@valerymelou/shared/seo';

import { BlogHomeComponent } from './blog-home.component';

describe('BlogHomeComponent', () => {
  let component: BlogHomeComponent;
  let fixture: ComponentFixture<BlogHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogHomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ articles: { items: [new Article(), new Article()] } }),
          },
        },
        {
          provide: MetadataService,
          useValue: { updateMetadata: () => true },
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
