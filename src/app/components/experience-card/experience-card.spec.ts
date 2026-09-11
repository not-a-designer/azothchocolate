import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceCard } from './experience-card';
import { Experience } from '../../declarations/interfaces';

describe('ExperienceCard', () => {
  let component: ExperienceCard;
  let fixture: ComponentFixture<ExperienceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('experience', {
      name: 'Cacao & Cup',
      subtitle: 'Coffee',
      modifier: 'coffee',
      description: 'A guided coffee and chocolate pairing.',
    } satisfies Experience);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the experience heading and modifier', () => {
    const card = fixture.nativeElement.querySelector('article') as HTMLElement;
    const heading = fixture.nativeElement.querySelector('h3') as HTMLElement;

    expect(card.classList.contains('coffee')).toBe(true);
    expect(heading.textContent).toContain('Cacao & Cup');
    expect(fixture.nativeElement.querySelector('img').getAttribute('src')).toBe(
      '/assets/coffee-1.svg',
    );
  });
});
