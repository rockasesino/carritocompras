import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartService, Product } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',                           // 🔹 Nombre del componente
  templateUrl: './cart.page.html',                // 🔹 Template HTML asociado
  styleUrls: ['./cart.page.scss'],                // 🔹 Estilos específicos
  standalone: true,                               // 🔹 Componente standalone (Angular 15+)
  imports: [IonicModule, CommonModule]            // 🔹 Módulos necesarios en la vista
})
export class CartPage implements OnInit {
  // 🔹 Arreglo de productos en el carrito
  cart: Product[] = [];

  // Inyección del servicio del carrito
  constructor(private cartService: CartService) {}

  // 🔹 Se ejecuta al cargar la página
  ngOnInit() {
    // Obtiene la lista de productos actuales desde el servicio
    this.cart = this.cartService.getCart();
  }

  // 🔹 Elimina un producto por su id
  removeItem(id: number) {
    this.cartService.removeProduct(id); // Llama al servicio para borrar
    this.cart = this.cartService.getCart(); // Refresca la lista del carrito
  }

  // 🔹 Calcula el total del carrito (suma de precios × cantidad)
  getTotal() {
    return this.cartService.getTotal();
  }
}
