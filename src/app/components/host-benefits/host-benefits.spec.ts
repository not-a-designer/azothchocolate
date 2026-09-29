import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostBenefits } from './host-benefits';

describe('HostBenefits', () => {
  let fixture: ComponentFixture<HostBenefits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostBenefits] }).compileComponents();
    fixture = TestBed.createComponent(HostBenefits);
    await fixture.whenStable();
  });

  it('should present three venue benefits without fixed commercial promises', () => {
    const element = fixture.nativeElement as HTMLElement;
    const benefits = element.querySelectorAll('.benefit-grid article');
    const copy = element.textContent ?? '';

    expect(benefits).toHaveLength(3);
    expect(copy).toContain('A reason to gather');
    expect(copy).toContain('Built around what you serve');
    expect(copy).toContain('Clear, flexible collaboration');
    expect(copy).toContain('brings the chocolate and guides the tasting');
    expect(copy).not.toMatch(/revenue split|fixed price|guaranteed attendance/i);
  });
});
