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
    expect(hero.textContent).toContain('focused four-chocolate explorations');
    expect(hero.textContent).toContain('pairings with coffee, beer, and wine');
    expect(exploreLink?.textContent).toContain('Explore Experiences');
  });
});
