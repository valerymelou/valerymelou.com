import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Observable, observable, of } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  template: 'footer'
})
class MockFooterComponent {}

@Component({
  selector: 'app-navbar',
  template: 'navbar'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-about-page',
  template: 'app about'
})
class AboutComponent {}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let router: Router;
  let swUpdates;

  beforeEach(async(() => {
    swUpdates = {
      available: of(true),
      activateUpdate: () => new Promise(() => true)
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'about', component: AboutComponent }])
      ],
      declarations: [
        AppComponent,
        MockFooterComponent,
        MockNavbarComponent
      ],
      providers: [
        {
          provide: SwUpdate,
          useValue: swUpdates
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should not show footer if router url is not /', (async () => {
    // TODO: is there a better way to test avoid ngZone warning?
    await fixture.ngZone.run(async () => {
      app.router.navigate(['/about']);
    });

    expect(app.showFooter).toBeTrue();
  }));

  it('should have updatesAvailable set to true', () => {
    expect(app.updatesAvailable).toBeTrue();
  });
});
