import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((page) => page.HomePage),
    pathMatch: 'full',
    title: 'Azoth Chocolate | Educational Chocolate Pairing Experiences',
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events').then((page) => page.EventsPage),
    title: 'Event Tasting | Azoth Chocolate',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
