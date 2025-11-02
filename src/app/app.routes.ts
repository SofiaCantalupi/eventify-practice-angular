import { Routes } from '@angular/router';
import { CreateEvent } from './pages/create-event/create-event';
import { EventList } from './pages/event-list/event-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full' // Cuando se usa path: '' con redirectTo → siempre debe usarse pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateEvent,
  },
  {
    path: 'events',
    component: EventList,
  },
  {
    path: '**',
    redirectTo: 'events',
  }
];
