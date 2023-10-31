import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

/**
 * Unit tests for the AppComponent.
 */
describe('AppComponent', () => {
  /**
   * Set up the test module with necessary imports and declarations.
   */
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    })
  );

  /**
   * Test to ensure the AppComponent is created successfully.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test to ensure the AppComponent has the expected title.
   */
  it(`should have as title 'myFlix-Angular-client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('myFlix-Angular-client');
  });

  /**
   * Test to ensure the AppComponent renders the title in the view.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'myFlix-Angular-client app is running!'
    );
  });
});
