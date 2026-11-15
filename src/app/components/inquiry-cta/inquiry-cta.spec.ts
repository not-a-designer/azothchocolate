import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InquiryCta } from './inquiry-cta';

describe('InquiryCta', () => {
  let component: InquiryCta;
  let fixture: ComponentFixture<InquiryCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryCta],
      providers: [provideRouter([])],
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
    const link = element.querySelector('a[routerLink="/inquire"]');

    expect(element.textContent).toContain('what your guests should discover');
    expect(element.textContent).toContain('Plan a Tasting');
    expect(element.textContent).not.toMatch(/revenue split|fixed price/i);
    expect(link).toBeTruthy();
  });
});
