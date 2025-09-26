import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string; // 👈 agregado para que cart tenga la imagen
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {
    this.loadFromStorage();
    this.updateCount();
  }

  addProduct(product: Product) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }
    this.saveToStorage();
    this.updateCount();
  }

  getCart() {
    return this.cart;
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.saveToStorage();
    this.updateCount();
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage();
    this.updateCount();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  private updateCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCount.next(totalItems);
  }
}
