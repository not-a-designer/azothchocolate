import { TastingEvent } from '../declarations/interfaces';

/**
 * Replace `null` with the next event's details before publishing.
 * Leave the most recent event in place until its replacement is ready.
 *
 * For a paired tasting, set `format: 'paired'` and provide `pairings`, an exact
 * four-item tuple. Each item needs a number, pairing position, chocolate, and beverage.
 *
 * For Cacao & Cocoa, set `format: 'chocolate-only'` and provide `samples`, an exact
 * four-item tuple. Each item needs a number and chocolate; no beverage is accepted.
 *
 * Minimal shapes:
 * `format: 'paired', pairings: [{ number: '01', position, chocolate, beverage }, ...]`
 * `format: 'chocolate-only', samples: [{ number: '01', chocolate }, ...]`
 *
 * Both formats share title, optional schedule/location fields, introduction, and updatedAt.
 */
export const activeEvent: TastingEvent | null = null;
