import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { CartService, CartItem } from '../../services/cart.service';
import { Product } from '../../models/product';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatBadgeModule, RouterModule, CustomCurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [];
  exchangeRate: number = 0;
  cartItems: CartItem[] = [];
  // Variables para representar el estado de la petición
  isLoading = false;
  hasError = false;
  errorMessage = '';

  public authService = inject(AuthService); // Público para usarlo en el HTML (*ngIf="authService.isAdmin()")
  public cartService = inject(CartService);
  private productService = inject(ProductService);
  private currencyService = inject(CurrencyService);

  ngOnInit(): void {
    // Si es ADMIN ve todo el inventario; si es CLIENTE ve solo catálogo comercial
    this.displayedColumns = this.authService.isAdmin()
      ? ['id', 'name', 'price', 'priceUsd', 'stock', 'category', 'actions']
      : ['name', 'price', 'priceUsd', 'category', 'actions'];

    this.loadProducts();
    this.loadExchangeRate();

    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  loadExchangeRate(): void {
    this.currencyService.getExchangeRate().subscribe({
      next: (data) => {
        this.exchangeRate = data.venta;
      },
      error: (err) => console.error('Error al cargar cotización', err)
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'No se pudo conectar con el servidor de datos.';
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

  addToCart(product: Product): void { // Métodos puente para el carrito
    this.cartService.addToCart(product);
  }

  removeFromCart(id: string): void {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: string, delta: number): void {
    this.cartService.updateQuantity(id, delta);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    alert('¡Gracias por tu compra! Tu pedido fue procesado con éxito (Simulación de Pago).');
    this.clearCart();
  }

  get cartTotalCount(): number {
    return this.cartService.getTotalItemsCount();
  }

  get cartTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}