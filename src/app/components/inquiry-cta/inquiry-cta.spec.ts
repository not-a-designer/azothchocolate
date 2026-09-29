import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InquiryCta } from './inquiry-cta';

describe('InquiryCta', () => {
  let component: InquiryCta;
  let fixture: ComponentFixture<InquiryCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryCta],
    }).compileComponents();

    fixture = TestBed.createComponent(InquiryCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invite a venue-specific conversation without fixed commercial terms', () => {
    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector('a[href^="mailto:joel@azothchocolate.com"]');

    expect(element.textContent).toContain('Tell Joel about your venue');
    expect(element.textContent).toContain('fits your space and service');
    expect(element.textContent).not.toMatch(/revenue split|fixed price/i);
    expect(link).toBeTruthy();
  });
});
