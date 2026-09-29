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

  it('should introduce both standalone tastings and paired experiences', () => {
    const hero = fixture.nativeElement as HTMLElement;
    const exploreLink = hero.querySelector<HTMLAnchorElement>('a[href="#experiences"]');

    expect(hero.textContent).toContain('Guided Chocolate Experiences');
    expect(hero.textContent).toContain('social, surprising, and anything but classroom-like');
    expect(hero.textContent).toContain('focused four-chocolate tasting');
    expect(hero.textContent).toContain('built around your coffee, beer, or wine');
    expect(exploreLink?.textContent).toContain('Explore Experiences');
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
