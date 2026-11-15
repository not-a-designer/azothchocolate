import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InquirePage } from './inquire';

describe('InquirePage', () => {
  let fixture: ComponentFixture<InquirePage>;
  let component: InquirePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquirePage],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InquirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('renders the four experiences and optional venue location field', () => {
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelectorAll('.check-option').length).toBe(4);
    expect(page.textContent).toContain('City and state / region');
    expect(page.querySelector('#city-region')?.hasAttribute('required')).toBe(false);
  });

  it('shows field errors when required fields are missing', async () => {
    await component.submit();
    fixture.detectChanges();

    expect(component.form.invalid).toBe(true);
    expect(component.statusMessage).toContain('review the highlighted fields');
    expect(fixture.nativeElement.querySelectorAll('.field-error').length).toBeGreaterThan(0);
  });

  it('requires at least one experience before submission', async () => {
    component.form.patchValue({
      name: 'Alex Host',
      email: 'alex@example.com',
      venue: 'Sample Venue',
    });
    await component.submit();
    fixture.detectChanges();

    expect(component.form.controls.programs.invalid).toBe(true);
    expect(component.statusMessage).toContain('select at least one experience');
  });

  it('does not submit without a Turnstile token', async () => {
    component.form.patchValue({
      name: 'Alex Host',
      email: 'alex@example.com',
      venue: 'Sample Venue',
      programs: ['Cacao & Cup'],
    });
    await component.submit();

    expect(component.form.valid).toBe(true);
    expect(component.statusMessage).toContain('complete the security check');
    expect(component.sending).toBe(false);
  });
});
