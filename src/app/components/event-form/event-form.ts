import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { EventService } from '../../services/event-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventI } from '../../eventI';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {
  // injeccion de dependencias
  categoryService = inject(CategoryService);
  eventService = inject(EventService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // se obtienen las categorias desde db.json para mostrarlas en el form
  categories = this.categoryService.categories;

  // Atributos necesarios para actualizar un evento
  eventSelected = signal<EventI | undefined>(undefined);
  isEditingMode = signal(false);

  // creacion del form
  eventForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', Validators.required],
    date: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  // carga las categorias si se refresca la pagina. Detecta si hay un id en la ruta, lo que indicaria que se esta en modo edicion
  ngOnInit(): void {
    this.categoryService.getCategories();

    const id = this.route.snapshot.params['id'];

    // si encuentra un id, se cambia a EditingMode y se carga el formulario con la info
    if (id) {
      this.isEditingMode.set(true);
      this.loadForm(Number(id));
    }
  }

  loadForm(id: number) {
    this.eventService.getEventByID(id).subscribe({
      next: (event) => {
        this.eventSelected.set(event);

        this.eventForm.patchValue(event);
      },
      error: (error) => {
        console.log('Error loading event', error);
        this.router.navigate(['/events']);
      },
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = {
        ...this.eventForm.getRawValue()
      };

      // Modo edicion
      if (this.isEditingMode()) {
        const id = this.eventSelected()?.id;

        if (id) {
          this.eventService.updateEvent(id, eventData).subscribe({
            next: () => { 
              this.eventForm.reset();
              this.router.navigate(['/event', id]);
            },
            error: (error) => {
              console.log('Error updating the event', error);
              // this.router.navigate(['/events', id]);
            },
          });
        }
      } else {
        // Modo creacion
        this.eventService.createEvent(eventData).subscribe({
          next: () => {
            this.eventForm.reset();
            this.router.navigate(['/events']);
          },
          error: (error) => {
            console.log('Error creating the events', error);
          }
        });
      }
      }else{
        // Marcar campos como touched para mostrar errores
      Object.keys(this.eventForm.controls).forEach(key => {
        this.eventForm.get(key)?.markAsTouched();
      });
      }
    }

  }


/* puede ser tmb this.router.navigateByUrl("events"); 
    
     navigate(['/events']) es más flexible, ya que crea la URL a partir de segmentos de un array y 
     aplica "parches" a la URL actual, mientras que navigateByUrl("events") reemplaza por completo 
     la URL actual con la que se le proporciona como cadena de texto. Esto significa que navigateByUrl es para navegación absoluta, 
     mientras que navigate es para construir rutas dinámicas a partir de la URL existente. 
    
    */
