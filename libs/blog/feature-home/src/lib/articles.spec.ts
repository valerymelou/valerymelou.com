import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { Article } from '@vm/blog/data-access';
import { MetadataService } from '@vm/shared/seo';

import { Articles } from './articles';

describe('Articles', () => {
  let component: Articles;
  let fixture: ComponentFixture<Articles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Articles],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ articles: { items: [new Article(), new Article()] } }),
          },
        },
        { provide: MetadataService, useValue: { updateMetadata: () => true } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Articles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
