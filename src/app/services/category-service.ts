import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Category } from '../category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly urlApi = 'http://localhost:3000/categories';

  private categoryState = signal<Category[]>([]);

  public categories = this.categoryState.asReadonly();
  
  constructor(private http: HttpClient) {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(this.urlApi).subscribe({
      next: (data) => {
        this.categoryState.set(data);
      },
      error: (error) => {
        console.log('Error al cargar categorias:', error);
      }
    });
  }
}
