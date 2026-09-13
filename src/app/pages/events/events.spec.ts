import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { TastingEvent } from '../../declarations/interfaces';
import { EventsPage } from './events';

const mockEvent: TastingEvent = {
  title: 'Autumn Pairing Session',
  date: 'October 18, 2026',
  time: '6:30 PM',
  venue: 'Example Tasting Room',
  partner: 'Example Beverage Partner',
  location: 'Albuquerque, New Mexico',
  introduction: 'A four-course study of fine chocolate and thoughtfully selected beverages.',
  updatedAt: 'October 16, 2026',
  pairings: [
    {
      number: '01',
      position: 'Accessible',
      chocolate: {
        name: 'Chocolate One',
        maker: 'Maker One',
        cacaoPercentage: '60%',
        origin: 'Origin One',
      },
      beverage: {
        name: 'Beverage One',
        producer: 'Producer One',
        style: 'Style One',
      },
    },
    {
      number: '02',
      position: 'Complementary',
      chocolate: {
        name: 'Chocolate Two',
        maker: 'Maker Two',
        cacaoPercentage: '65%',
        origin: 'Origin Two',
      },
      beverage: {
        name: 'Beverage Two',
        producer: 'Producer Two',
        style: 'Style Two',
      },
    },
    {
      number: '03',
      position: 'Technical',
      chocolate: {
        name: 'Chocolate Three',
        maker: 'Maker Three',
        cacaoPercentage: '70%',
        origin: 'Origin Three',
      },
      beverage: {
        name: 'Beverage Three',
        producer: 'Producer Three',
        style: 'Style Three',
      },
    },
    {
      number: '04',
      position: 'Surprise',
      chocolate: {
        name: 'Chocolate Four',
        maker: 'Maker Four',
        cacaoPercentage: '75%',
        origin: 'Origin Four',
      },
      beverage: {
        name: 'Beverage Four',
        producer: 'Producer Four',
        style: 'Style Four',
      },
    },
  ],
};

describe('EventsPage', () => {
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPage);
  });

  it('should render a branded holding state when no event is active', async () => {
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('#holding-title')?.textContent).toContain('Your tasting details');
    expect(page.querySelector('.pairing-grid')).toBeNull();
    expect(page.querySelector('.event-brand')?.getAttribute('href')).toBe('/');
    expect(page.querySelector('a[href^="mailto:joel@azothchocolate.com"]')).toBeTruthy();
  });

  it('should render exactly four ordered chocolate and beverage pairings', async () => {
    fixture.componentRef.setInput('event', mockEvent);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const pairings = [...page.querySelectorAll<HTMLElement>('.pairing-grid > li')];

    expect(pairings).toHaveLength(4);
    expect(page.querySelector('h1')?.textContent).toContain(mockEvent.title);
    expect(
      pairings.map((pairing) => pairing.querySelector('.pairing-position')?.textContent?.trim()),
    ).toEqual(['Accessible', 'Complementary', 'Technical', 'Surprise']);

    for (const [index, pairing] of pairings.entries()) {
      expect(pairing.textContent).toContain(mockEvent.pairings[index].chocolate.name);
      expect(pairing.textContent).toContain(mockEvent.pairings[index].chocolate.maker);
      expect(pairing.textContent).toContain(mockEvent.pairings[index].chocolate.cacaoPercentage);
      expect(pairing.textContent).toContain(mockEvent.pairings[index].chocolate.origin);
      expect(pairing.textContent).toContain(mockEvent.pairings[index].beverage.name);
      expect(pairing.textContent).toContain(mockEvent.pairings[index].beverage.producer);
      expect(pairing.textContent).toContain(mockEvent.pairings[index].beverage.style);
    }
  });

  it('should expose an accessible ordered flight and pairing headings', async () => {
    fixture.componentRef.setInput('event', mockEvent);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(
      page.querySelector('ol[aria-label="Four chocolate and beverage pairings"]'),
    ).toBeTruthy();
    expect(page.querySelectorAll('.pairing-card[aria-labelledby]')).toHaveLength(4);
    expect(page.querySelectorAll('.pairing-card h2.sr-only')).toHaveLength(4);
  });

  it('should set direct-link event metadata', async () => {
    fixture.componentRef.setInput('event', mockEvent);
    await fixture.whenStable();

    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    expect(title.getTitle()).toBe(`${mockEvent.title} | Azoth Chocolate`);
    expect(meta.getTag('name="description"')?.content).toBe(mockEvent.introduction);
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
  });
});
