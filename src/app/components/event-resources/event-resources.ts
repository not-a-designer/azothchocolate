import { Component, input } from '@angular/core';

interface ResourceLink {
  label: string;
  href: string;
}

interface ResourceGroup {
  title: 'Learn' | 'Find' | 'Local';
  modifier: 'learn' | 'find' | 'local';
  links: readonly ResourceLink[];
}

const RESOURCE_GROUPS: readonly ResourceGroup[] = [
  {
    title: 'Learn',
    modifier: 'learn',
    links: [{ label: 'makeminefine.com', href: 'https://www.makeminefine.com/' }],
  },
  {
    title: 'Find',
    modifier: 'find',
    links: [{ label: 'scienceofchocolate.com', href: 'https://www.scienceofchocolate.com/' }],
  },
  {
    title: 'Local',
    modifier: 'local',
    links: [
      { label: 'yaharachocolate.com', href: 'https://www.yaharachocolate.com/' },
      { label: 'chocolatesommelier.com', href: 'https://www.chocolatesommelier.com/' },
      { label: 'tabalchocolate.com', href: 'https://www.tabalchocolate.com/' },
      { label: 'sjolinds.com', href: 'https://www.sjolinds.com/' },
      { label: 'blacksheepchocolate.com', href: 'https://blacksheepchocolate.com/' },
    ],
  },
];

@Component({
  selector: 'event-resources',
  styleUrl: './event-resources.scss',
  templateUrl: './event-resources.html',
})
export class EventResources {
  readonly tastingRecordUrl = input<string | null>(null);
  readonly resourceGroups = RESOURCE_GROUPS;
}
