import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from 'src/app/services/cart.service'; // 👈 Servicio del carrito

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true, // 👈 este componente no necesita un módulo aparte
  imports: [CommonModule, IonicModule, RouterLink, RouterOutlet], // 👈 módulos que usa
})
export class TabsPage implements OnInit {
  cartCount = 0; // 👈 almacena el número de productos en el carrito

  // 👇 inyectamos el servicio del carrito en el constructor
  constructor(private cartService: CartService) {}

  ngOnInit() {
    // 👀 nos suscribimos al observable del servicio para escuchar cambios
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartCount = count; // 👉 actualiza el contador en tiempo real
    });
  }
}
