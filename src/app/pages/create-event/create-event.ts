import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { EventForm } from '../../components/event-form/event-form';

@Component({
  selector: 'app-create-event',
  imports: [EventForm],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css',
})
export class CreateEvent {

}
