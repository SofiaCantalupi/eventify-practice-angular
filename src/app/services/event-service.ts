import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { EventI } from '../eventI';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly urlApi = 'http://localhost:3000/events';

  private eventsState = signal<EventI[]>([]);

  public events = this.eventsState.asReadonly();

  constructor(private http: HttpClient) {
    this.getEvents();
  }

  getEvents() {
    this.http.get<EventI[]>(this.urlApi).subscribe({
      next: (data) => {
        this.eventsState.set(data);
      },
      error: (error) => {
        console.error('Error loading the events:', error);
      },
    });
  }

  createEvent(event: Omit<EventI, 'id'>){
    this.http.post<EventI>(this.urlApi, event).subscribe({
      next: (data) => {
        this.eventsState.update(events => [...events, data]);
      },
      error: (error) => {
        console.log('Error creating the event:', event)
      }
    });
  }


  /* para editar se hace un atributo que puede ser Event o undefined para guardar el evento a editar */
}
