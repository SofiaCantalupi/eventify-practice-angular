import { Component, inject, OnInit, signal } from '@angular/core';
import { EventI } from '../../eventI';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  eventService = inject(EventService);

  event = signal<EventI | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.eventService.getEventByID(id).subscribe((data) => this.event.set(data));
  }

  navigateToUpdate() {
    const id = this.event()?.id;
    this.router.navigate(['/events', id, 'update']);
  }

  deleteEvent(): void {
    // agregar confirm()
    const currentEvent = this.event();

    if (!currentEvent) {
      console.error('No event loaded to delete');
      return;
    }

    if (confirm('Are you sure you want to delete this events?')) {
      this.eventService.deleteEvent(currentEvent.id).subscribe({
        next: () => {
          console.log('Event deleted successfully');
          this.router.navigate(['/events']); // volver al listado
        },
        error: (err) => {
          console.error('Error deleting event:', err);
        },
      });
    }
  }
}
