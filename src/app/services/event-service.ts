import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { EventI } from '../eventI';
import { tap } from 'rxjs';

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
    return this.http.post<EventI>(this.urlApi, event).pipe(
      tap((data) => {
        this.eventsState.update(events => [...events, data]);
      }
    ));
  }

  getEventByID(id: number){
    return this.http.get<EventI>(`${this.urlApi}/${id}`);
  }

  updateEvent(id: number, newEvent: Omit<EventI,'id'>){
    return this.http.put<EventI>(`${this.urlApi}/${id}`, newEvent).pipe(
      tap ((data) => {
        this.eventsState.update((events) => 
          events.map((event) => (event.id === id ? data : event)));
      })
    );
  }

  deleteEvent(id: number){
    return this.http.delete<EventI>(`${this.urlApi}/${id}`).pipe(
      tap(()=> {
        this.eventsState.update((events) => events.filter(e => e.id !== id));
      })
    );
  }

  /* para editar se hace un atributo que puede ser Event o undefined para guardar el evento a editar */
}
