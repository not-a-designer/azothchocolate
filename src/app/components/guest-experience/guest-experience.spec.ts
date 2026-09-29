import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestExperience } from './guest-experience';

describe('GuestExperience', () => {
  let component: GuestExperience;
  let fixture: ComponentFixture<GuestExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(GuestExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should lead with the social experience and retain four educational subjects', () => {
    const element = fixture.nativeElement as HTMLElement;
    const image = element.querySelector('img') as HTMLImageElement;

    expect(element.querySelector('h2')?.textContent).toContain('Taste. Compare.');
    expect(element.textContent).toContain('guided without feeling lectured');
    expect(element.querySelectorAll('.details li')).toHaveLength(4);
    expect(element.querySelector('blockquote')).toBeNull();
    expect(image.getAttribute('src')).toBe('/images/azoth-guests-social.webp');
    expect(image.getAttribute('loading')).toBe('lazy');
    expect(image.alt).toContain('plain chocolate bar samples');
  });
});
