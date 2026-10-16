import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]); // BehaviorSubject almacena el estado reactivo del carrito
  public items$ = this.itemsSubject.asObservable();

  addToCart(product: Product): void {
    const current = this.itemsSubject.getValue();
    const existingIndex = current.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) { // Si ya estaba en el carrito, aumentamos la cantidad en 1
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      };
      this.itemsSubject.next(updated);
    } else { // Si es la primera vez que se agrega, lo sumamos con cantidad 1
      this.itemsSubject.next([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string): void {
    const current = this.itemsSubject.getValue();
    this.itemsSubject.next(current.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, delta: number): void {
    const current = this.itemsSubject.getValue();
    const existingIndex = current.findIndex(item => item.product.id === productId);

    if (existingIndex > -1) {
      const updated = [...current];
      const newQuantity = updated[existingIndex].quantity + delta;

      if (newQuantity <= 0) {
        this.removeFromCart(productId);
      } else {
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQuantity
        };
        this.itemsSubject.next(updated);
      }
    }
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.itemsSubject.getValue().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getTotalItemsCount(): number {
    return this.itemsSubject.getValue().reduce((count, item) => count + item.quantity, 0);
  }
}