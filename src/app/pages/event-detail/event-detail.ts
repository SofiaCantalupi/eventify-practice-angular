import { Component, inject, OnInit, signal } from '@angular/core';
import { EventI } from '../../eventI';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-event-detail',
  imports: [],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit{

  router = inject(Router);
  route = inject(ActivatedRoute);
  eventService = inject(EventService);

  event = signal<EventI | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['/id']);

    this.eventService.getEventByID(id).subscribe(
      data => this.event.set(data)
    );
  }

  navigateToUpdate(){
    const id = this.event()?.id;
    this.router.navigate(['/events', id, 'update']);
  }

  delete(id: number){
  }

}
