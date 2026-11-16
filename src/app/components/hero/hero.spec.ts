import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should explain the educational tasting offer clearly', () => {
    const hero = fixture.nativeElement as HTMLElement;
    const journeyLink = hero.querySelector<HTMLAnchorElement>('a[href="#journey"]');
    const guestGuideLink = hero.querySelector<HTMLAnchorElement>('a[href="/events"]');

    expect(hero.textContent).toContain('From bean to bar,');
    expect(hero.textContent).toContain('taste the difference');
    expect(hero.textContent).toContain('Azoth partners with Wisconsin venues');
    expect(hero.textContent).toContain('four carefully chosen chocolates');
    expect(hero.querySelector('figure.hero-visual > .image-brand-line')?.textContent).toContain(
      'Chocolate, the universal solvent',
    );
    expect(hero.querySelector('.hero-image .image-brand-line')).toBeNull();
    expect(journeyLink?.textContent).toContain('See the Journey');
    expect(guestGuideLink?.textContent).toContain('View the tasting guide');
    expect(hero.textContent).toContain('Already have a ticket?');
  });

  it('should prioritize only the people-first hero image', () => {
    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(image.getAttribute('src')).toBe('/images/azoth-hero-social.webp');
    expect(image.getAttribute('fetchpriority')).toBe('high');
    expect(image.getAttribute('width')).toBe('1536');
    expect(image.getAttribute('height')).toBe('1024');
    expect(image.alt).toContain('plain chocolate bar pieces');
  });
});
