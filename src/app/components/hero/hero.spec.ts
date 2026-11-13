import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
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

    expect(hero.textContent).toContain('From bean to bar,');
    expect(hero.textContent).toContain('taste the difference.');
    expect(hero.textContent).toContain('compare industrial and craft approaches');
    expect(hero.textContent).toContain('four carefully selected chocolates');
    expect(hero.textContent).toContain('Chocolate, the universal solvent.');
    expect(journeyLink?.textContent).toContain('See the Journey');
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
