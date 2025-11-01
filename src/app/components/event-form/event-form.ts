import { Component, inject, OnInit, signal} from '@angular/core';
import { Category } from '../../category';
import { CategoryService } from '../../services/category-service';
import { EventService } from '../../services/event-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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

    console.log(eventData);
    this.eventService.createEvent(eventData);
  
  }
}
}
