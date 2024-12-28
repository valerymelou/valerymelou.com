import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ButtonComponent } from './button.component';

@Component({
  template: `
    <button ui-flat-button>Test</button>
    <button ui-flat-button full>Test</button>
    <button ui-flat-button large>Test</button>
    <button ui-flat-button disabled>Test</button>
  `,
  selector: 'ui-button-test',
  imports: [ButtonComponent],
})
class ButtonTestComponent {}

describe('ButtonComponent', () => {
  let component: ButtonTestComponent;
  let fixture: ComponentFixture<ButtonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
