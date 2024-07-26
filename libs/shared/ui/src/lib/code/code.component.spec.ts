import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeComponent } from './code.component';
import { By } from '@angular/platform-browser';
import { WINDOW_TOKEN } from '@valerymelou/common/browser';

describe('CodeComponent', () => {
  let component: CodeComponent;
  let fixture: ComponentFixture<CodeComponent>;
  const code = '```html\n<h1>Hello World</h1><div>This is a test</div>\n';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeComponent],
      providers: [
        {
          provide: WINDOW_TOKEN,
          useValue: {
            navigator: { clipboard: { writeText: () => Promise.resolve() } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeComponent);
    component = fixture.componentInstance;
    component.code = code;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should copy the code to the clipboard', () => {
    const window = TestBed.inject(WINDOW_TOKEN);
    const writeTextSpy = jest.spyOn(window.navigator.clipboard, 'writeText');
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click');
    expect(writeTextSpy).toHaveBeenCalledWith(
      code.replace('```html\n', '').replace('\n```', ''),
    );
  });
});
