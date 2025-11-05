import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event-service';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../category';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-event-list',
  imports: [RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  eventService = inject(EventService);
  categoryService = inject(CategoryService);

  // se guarda la referencia a la signal del servicio
  events = this.eventService.events;
  categories = this.categoryService.categories;

  ngOnInit(): void {
    // refresca la lista cada vez que se ingresa a la pagina, como getEvents hace la peticion get y events es una referencia al signal del servicio, se actualiza
    this.eventService.getEvents();
  }

  getCategoryName(categoryId: string): string {
    const category: Category | undefined = this.categories().find((c) => c.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }
}
