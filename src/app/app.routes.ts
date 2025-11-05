import { Routes } from '@angular/router';
import { EventList } from './pages/event-list/event-list';
import { EventForm } from './components/event-form/event-form';
import { EventDetail } from './pages/event-detail/event-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full' // Cuando se usa path: '' con redirectTo → siempre debe usarse pathMatch: 'full'
  },
  {
    path: 'events/create',
    component: EventForm,
  },
  {
    path: 'events/:id',
    component: EventDetail
  },
  {
    path: 'events/:id/update',
    component: EventForm
  },
  {
    path: 'events',
    component: EventList,
  },
  {
    path: '**',
    redirectTo: 'events',
    pathMatch: 'full'
  }
];
