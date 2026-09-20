import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Experiences } from './experiences';

describe('Experiences', () => {
  let component: Experiences;
  let fixture: ComponentFixture<Experiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experiences],
    }).compileComponents();

    fixture = TestBed.createComponent(Experiences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all four tasting experiences with their modifiers', () => {
    const cards = [...fixture.nativeElement.querySelectorAll('article')] as HTMLElement[];
    const headings = cards.map((card) => card.querySelector('h3')?.textContent?.trim());

    expect(cards).toHaveLength(4);
    expect(headings).toEqual(['Cacao & Cup', 'Cacao & Craft', 'Cacao & Vine', 'Cacao & Cocoa']);
    expect(cards.map((card) => card.classList.item(1))).toEqual([
      'coffee',
      'beer',
      'wine',
      'cocoa',
    ]);
    expect(cards.map((card) => card.querySelector('img')?.getAttribute('src'))).toEqual([
      '/assets/coffee-1.svg',
      '/assets/beer-1.svg',
      '/assets/wine-1.svg',
      '/assets/cocoa-1.svg',
    ]);
    expect(fixture.nativeElement.querySelector('.eyebrow')?.textContent).toContain(
      'Four Ways to Taste',
    );
    expect(fixture.nativeElement.querySelector('.section-heading')?.textContent).toContain(
      'Four perspectives',
    );
  });
});
