import { TastingEvent } from '../declarations/interfaces';

/**
 * Replace `null` with the next event's details before publishing.
 * Leave the most recent event in place until its replacement is ready.
 */
export const activeEvent: TastingEvent | null = null;
