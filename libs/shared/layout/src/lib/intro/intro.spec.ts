import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Intro } from './intro';

describe('Intro', () => {
  let component: Intro;
  let fixture: ComponentFixture<Intro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Intro],
    }).compileComponents();

    fixture = TestBed.createComponent(Intro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
