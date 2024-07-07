import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialBarComponent } from './social-bar.component';
import { provideRouter } from '@angular/router';

describe('SocialBarComponent', () => {
  let component: SocialBarComponent;
  let fixture: ComponentFixture<SocialBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialBarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
