import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

@Component({
  template: `
    <button ui-button>Test</button>
    <button ui-raised-button>Test</button>
    <button ui-stroked-button>Test</button>
    <button ui-stroked-button [isFull]="true">Test</button>
    <button ui-stroked-button [isLarge]="true">Test</button>
    <button ui-stroked-button [disabled]="true">Test</button>
  `,
  selector: 'ui-button-test',
})
class ButtonTestComponent {}

describe('ButtonComponent', () => {
  let component: ButtonTestComponent;
  let fixture: ComponentFixture<ButtonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonTestComponent],
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
