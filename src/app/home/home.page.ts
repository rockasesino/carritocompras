import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ]
})
export class HomePage {

  constructor() {}

  // 👇 Método de prueba para que no dé error
  addToCart() {
    console.log('Producto de prueba agregado al carrito');
    // Aquí más adelante conectamos con el servicio de carrito
  }
}
