import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  eventService = inject(EventService);

  // se guarda la referencia a la signal del servicio
  events = this.eventService.events;

  ngOnInit(): void {
    // refresca la lista cada vez que se ingresa a la pagina, como getEvents hace la peticion get y events es una referencia al signal del servicio, se actualiza
    this.eventService.getEvents();
  }
}
