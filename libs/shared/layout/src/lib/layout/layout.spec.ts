import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from '../header/header';
import { Layout } from './layout';

@Component({
  selector: 'layout-header',
  template: 'header works!',
})
class HeaderStub {
  backButton = input<boolean>(false);
}

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideRouter([])],
    })
      .overrideComponent(Layout, {
        add: { imports: [HeaderStub] },
        remove: { imports: [Header] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
