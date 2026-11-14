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

  it('should place social links after the tasting link and before email', () => {
    const contact = (fixture.nativeElement as HTMLElement).querySelector('.footer-contact');
    const items = Array.from(contact?.children ?? []);

    expect(items[0]?.textContent?.trim()).toBe('Connect');
    expect(items[1]?.textContent?.trim()).toBe('Plan a Tasting');
    expect(items[2]?.getAttribute('aria-label')).toBe('Social media');
    expect(items[3]?.getAttribute('href')).toBe('mailto:joel@azothchocolate.com');
  });
});
