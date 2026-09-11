import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the current year and accessible brand fallback', () => {
    const footer = fixture.nativeElement as HTMLElement;

    expect(footer.textContent).toContain(String(new Date().getFullYear()));
    expect(footer.querySelector('.brand')?.getAttribute('aria-label')).toBe('Azoth Chocolate home');
  });
});
