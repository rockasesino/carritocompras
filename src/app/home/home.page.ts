// Importaciones necesarias de Angular e Ionic
import { Component, OnInit } from '@angular/core';         // Componentes y ciclo de vida de Angular
import { CommonModule } from '@angular/common';            // Módulo con directivas comunes (*ngIf, *ngFor, etc.)
import { IonicModule } from '@ionic/angular';              // Módulo de Ionic con componentes UI (ion-header, ion-button, etc.)
import { RouterLink } from '@angular/router';              // Permite usar routerLink en las plantillas
import { CartService } from 'src/app/services/cart.service'; // Servicio personalizado para manejar el carrito

// Decorador @Component: define metadatos del componente
@Component({
  selector: 'app-home',                          // Nombre de la etiqueta que representa este componente
  templateUrl: './home.page.html',               // Archivo de la vista (HTML)
  styleUrls: ['./home.page.scss'],               // Estilos específicos del componente
  standalone: true,                              // Este componente es standalone (no depende de un módulo tradicional)
  imports: [CommonModule, IonicModule, RouterLink], // Módulos y directivas que este componente puede usar
})
export class HomePage implements OnInit {
  // Variable que guarda la cantidad de productos en el carrito
  cartCount = 0;

  // Inyección de dependencias: se inyecta el servicio del carrito
  constructor(private cartService: CartService) {}

  // Método del ciclo de vida que se ejecuta al iniciar el componente
  ngOnInit() {
    // Nos suscribimos al observable que emite la cantidad de items en el carrito
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartCount = count; // Actualiza la variable cartCount cada vez que cambia el carrito
    });
  }
}
