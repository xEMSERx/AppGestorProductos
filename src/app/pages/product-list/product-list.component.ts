import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { Product } from '../../models/product';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; // Importaciones de Angular Material para la tabla y botones
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, RouterModule, CustomCurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = new MatTableDataSource<Product>([]); // Utilizamos MatTableDataSource para habilitar el filtro

  displayedColumns: string[] = ['id', 'name', 'price', 'priceUsd', 'stock', 'category', 'actions']; // Definimos qué columnas queremos mostrar en la tabla de Material

  exchangeRate: number = 0;

  private productService = inject(ProductService); // Inyectamos nuestro servicio
  private currencyService = inject(CurrencyService); // <-- Inyectamos

  ngOnInit(): void { // ngOninit se ejecuta automáticamente ni bien se abre esta pantalla
    this.loadProducts();
    this.loadExchangeRate();
  }

  loadExchangeRate(): void {
    this.currencyService.getExchangeRate().subscribe({
      next: (data) => {
        this.exchangeRate = data.venta; // La API externa nos manda un JSON en español, eso no lo podemos cambiar
      },
      error: (err) => console.error('Error al cargar cotización', err)
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({ // Nos "suscribimos" al Observable. Cuando los datos llegan, los guardamos en el array.
      next: (data) => {
        this.products.data = data;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts(); // Si se eliminó en la API, recargamos la lista para que desaparezca de la pantalla
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  // Método para el buscador
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }
}