export type IconName = 'coffee' | 'beer' | 'wine' | 'consult' | 'develop' | 'source' | 'host';

export interface Experience {
  name: string;
  subtitle: string;
  description: string;
  modifier: 'coffee' | 'beer' | 'wine';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: IconName;
}

export type PairingPosition = 'Accessible' | 'Complementary' | 'Technical' | 'Surprise';

export type PairingNumber = '01' | '02' | '03' | '04';

export interface EventChocolate {
  name: string;
  maker: string;
  cacaoPercentage: string;
  origin: string;
}

export interface EventBeverage {
  name: string;
  producer: string;
  style: string;
}

export interface EventPairing {
  number: PairingNumber;
  position: PairingPosition;
  chocolate: EventChocolate;
  beverage: EventBeverage;
}

export type EventFlight = readonly [EventPairing, EventPairing, EventPairing, EventPairing];

export interface TastingEvent {
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  partner?: string;
  location?: string;
  introduction: string;
  updatedAt: string;
  pairings: EventFlight;
}
