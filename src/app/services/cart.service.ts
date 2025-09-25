import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  constructor() {
    this.loadFromStorage(); // 👈 Cargar carrito guardado al iniciar
  }

  // Agregar producto
  addProduct(product: Product) {
    const existing = this.cart.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += product.quantity; // Si ya existe, aumenta cantidad
    } else {
      this.cart.push(product);
    }

    this.saveToStorage();
  }

  // Obtener productos del carrito
  getCart() {
    return this.cart;
  }

  // Eliminar producto
  removeProduct(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.saveToStorage();
  }

  // Vaciar carrito
  clearCart() {
    this.cart = [];
    this.saveToStorage();
  }

  // Obtener total del carrito
  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // -------------------------------
  // Métodos privados para storage
  // -------------------------------
  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }
}
