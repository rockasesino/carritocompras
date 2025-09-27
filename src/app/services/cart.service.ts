import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// 🔹 Interfaz para los productos del carrito
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string; // 👈 agregado para mostrar la imagen del producto en el carrito
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = []; // 🔹 Lista interna de productos en el carrito
  private cartItemCount = new BehaviorSubject<number>(0); // 🔹 Observable para contar items

  cartItemCount$ = this.cartItemCount.asObservable(); // 👀 Observable expuesto para que los componentes puedan suscribirse

  constructor() {
    this.loadFromStorage(); // 🔹 Cargar el carrito desde localStorage (si existe)
    this.updateCount();     // 🔹 Actualizar el contador inicial
  }

  // -------------------------
  // 🔹 Agregar producto al carrito
  // -------------------------
  addProduct(product: Product) {
    const existing = this.cart.find(p => p.id === product.id); // buscar si ya existe
    if (existing) {
      existing.quantity += product.quantity; // si existe, sumar cantidad
    } else {
      this.cart.push(product); // si no, agregarlo al carrito
    }
    this.saveToStorage(); // guardar en localStorage
    this.updateCount();   // actualizar contador
  }

  // -------------------------
  // 🔹 Obtener productos del carrito
  // -------------------------
  getCart() {
    return this.cart;
  }

  // -------------------------
  // 🔹 Eliminar un producto por ID
  // -------------------------
  removeProduct(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.saveToStorage();
    this.updateCount();
  }

  // -------------------------
  // 🔹 Vaciar el carrito
  // -------------------------
  clearCart() {
    this.cart = [];
    this.saveToStorage();
    this.updateCount();
  }

  // -------------------------
  // 🔹 Calcular el total $
  // -------------------------
  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // -------------------------
  // 🔹 Guardar en localStorage
  // -------------------------
  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // -------------------------
  // 🔹 Cargar desde localStorage
  // -------------------------
  private loadFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  // -------------------------
  // 🔹 Actualizar el contador total
  // -------------------------
  private updateCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCount.next(totalItems); // 🔹 emite el nuevo valor a todos los que estén suscritos
  }
}
