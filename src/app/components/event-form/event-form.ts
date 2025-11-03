import { Component, inject, OnInit, signal} from '@angular/core';
import { Category } from '../../category';
import { CategoryService } from '../../services/category-service';
import { EventService } from '../../services/event-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {
  categoryService = inject(CategoryService);
  eventService = inject(EventService);
  fb = inject(FormBuilder);
  router = inject(Router);

  categories = this.categoryService.categories;

  eventForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', Validators.required],
    date: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.categoryService.getCategories();
  }

  onSubmit() {
    if (this.eventForm.valid) {
    const eventData = {
      name: this.eventForm.value.name!,
      category: this.eventForm.value.category!,
      date: this.eventForm.value.date!,
      description: this.eventForm.value.description!
    };

    this.eventService.createEvent(eventData);

    this.eventForm.reset();
    this.router.navigate(['/events']);
    

    /* puede ser tmb this.router.navigateByUrl("events"); 
    
     navigate(['/events']) es más flexible, ya que crea la URL a partir de segmentos de un array y 
     aplica "parches" a la URL actual, mientras que navigateByUrl("events") reemplaza por completo 
     la URL actual con la que se le proporciona como cadena de texto. Esto significa que navigateByUrl es para navegación absoluta, 
     mientras que navigate es para construir rutas dinámicas a partir de la URL existente. 
    
    */
  }
}
}
