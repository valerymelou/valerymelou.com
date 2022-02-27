import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContentfulService } from 'src/app/core/contentful.service';

import { WorkComponent } from './work.component';

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;
  let contentfulServiceSpy: jasmine.SpyObj<ContentfulService>;

  beforeEach(async () => {
    const contentfulServiceMock = jasmine.createSpyObj('ContentfulService', ['getProjects']);

    await TestBed.configureTestingModule({
      declarations: [ WorkComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: contentfulServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    contentfulServiceSpy = TestBed.inject(ContentfulService) as jasmine.SpyObj<ContentfulService>;
    contentfulServiceSpy.getProjects.and.returnValue(of({
      items: [],
      total: 0,
      skip: 0,
      limit: 0
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
