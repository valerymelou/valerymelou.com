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

  it('should change the theme', () => {
    component.changeTheme('dark');

    expect(component.theme).toBe('dark');
  });

  it('should reset theme to preferred theme', () => {
    component.resetTheme();

    expect(component.theme).toBe('light');
  });
});
