import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://6aa5e947d7765db985071b8b.mockapi.io/products'; // URL de MockAPI

  private http = inject(HttpClient); // Inyectamos HttpClient utilizando la nueva sintaxis de Angular

  constructor() { }

  getProducts(): Observable<Product[]> { // 1. Obtener todos los productos (Read)
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> { // 2. Obtener un producto por ID
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> { // 3. Crear un nuevo producto (Create)
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> { // 4. Actualizar un producto existente (Update)
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<Product> { // 5. Eliminar un producto (Delete)
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}