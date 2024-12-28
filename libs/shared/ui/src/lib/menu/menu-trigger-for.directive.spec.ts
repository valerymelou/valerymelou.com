import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuTriggerForDirective } from './menu-trigger-for.directive';
import { MenuComponent } from './menu.component';

@Component({
  template: `
    <button [uiMenuTriggerFor]="testMenu" data-test-id="open-menu">
      Test Menu
    </button>
    <button [uiMenuTriggerFor]="testMenu" xPosition="after">Test Menu</button>
    <button [uiMenuTriggerFor]="testMenu" yPosition="above">Test Menu</button>
    <ui-menu #testMenu>
      <button data-test-id="option">Option</button>
    </ui-menu>
  `,
  selector: 'ui-test-component',
  imports: [MenuTriggerForDirective, MenuComponent],
})
// skipcq: JS-0327
class TestComponent {}

describe('MenuTriggerForDirective', () => {
  let fixture: ComponentFixture<Component>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should have three menu trigger', () => {
    const trigger = fixture.debugElement.queryAll(
      By.directive(MenuTriggerForDirective),
    );
    trigger.forEach((d: DebugElement) => {
      d.triggerEventHandler('click', null);
    });

    trigger[0].triggerEventHandler('click', null);
    trigger[0].triggerEventHandler('click', null);

    expect(trigger.length).toEqual(3);
  });
});
