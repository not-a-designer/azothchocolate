import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('introduces Joel Johnson and his experience highlights', () => {
    const element: HTMLElement = fixture.nativeElement;
    const highlights = element.querySelectorAll('.credentials > div');

    expect(element.textContent).toContain('Led by Joel Johnson');
    expect(element.textContent).toContain('Professional chocolatier and fine chocolate maker');
    expect(element.textContent).toContain('more than 25 internationally award-winning chocolates');
    expect(element.textContent).toContain('Tempered and poured by Joel');

    const portrait = element.querySelector<HTMLImageElement>('.founder-portrait img');
    expect(portrait?.getAttribute('src')).toBe('/images/joel-johnson.webp');
    expect(portrait?.getAttribute('loading')).toBe('lazy');
    expect(portrait?.alt).toContain('Joel Johnson');
    expect(highlights.length).toBe(4);
  });
});
