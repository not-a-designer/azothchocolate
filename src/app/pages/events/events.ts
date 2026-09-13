import { Component, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { activeEvent } from '../../data/event.data';
import { TastingEvent } from '../../declarations/interfaces';

const EVENT_TITLE = 'Event Tasting | Azoth Chocolate';
const EVENT_DESCRIPTION =
  'The current Azoth Chocolate event tasting flight, with four guided chocolate and beverage pairings.';

@Component({
  selector: 'azoth-events-page',
  styleUrl: './events.scss',
  templateUrl: './events.html',
})
export class EventsPage {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly event = input<TastingEvent | null>(activeEvent);
  readonly year = new Date().getFullYear();

  private readonly metadataEffect = effect(() => {
    const event = this.event();
    const title = event ? `${event.title} | Azoth Chocolate` : EVENT_TITLE;
    const description = event?.introduction || EVENT_DESCRIPTION;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
  });
}
