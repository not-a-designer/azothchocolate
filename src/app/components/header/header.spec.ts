import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle its accessible mobile menu state and body scroll lock', () => {
    const button = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.classList.contains('menu-open')).toBe(true);

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('menu-open')).toBe(false);
  });

  it('should close on Escape and when a navigation link is selected', () => {
    component.toggleMenu();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(false);

    component.toggleMenu();
    const link = fixture.nativeElement.querySelector('nav a') as HTMLAnchorElement;
    link.click();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(false);
    expect(document.body.classList.contains('menu-open')).toBe(false);
  });
});
