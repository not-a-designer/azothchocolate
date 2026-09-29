import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { activeEvent, tastingRecordUrl as activeTastingRecordUrl } from '../../data/event.data';
import { TastingEvent } from '../../declarations/interfaces';
import { EventResources } from '../../components/event-resources/event-resources';
import { setCanonicalUrl } from '../../utils/canonical';

const EVENT_TITLE = 'Event Tasting | Azoth Chocolate';
const EVENT_DESCRIPTION =
  'The current Azoth Chocolate event tasting guide, featuring four guided chocolate samples or pairings.';
const EVENT_URL = 'https://azothchocolate.com/events';

@Component({
  imports: [EventResources],
  selector: 'azoth-events-page',
  styleUrl: './events.scss',
  templateUrl: './events.html',
})
export class EventsPage {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly event = input<TastingEvent | null>(activeEvent);
  readonly tastingRecordUrl = input<string | null>(activeTastingRecordUrl);
  readonly year = new Date().getFullYear();

  private readonly metadataEffect = effect(() => {
    const event = this.event();
    const title = event ? `${event.title} | Azoth Chocolate` : EVENT_TITLE;
    const description = event?.introduction || EVENT_DESCRIPTION;

    setCanonicalUrl(this.document, EVENT_URL);
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: EVENT_URL });
  });
}
