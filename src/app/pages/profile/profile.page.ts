import { Component, OnInit } from '@angular/core'; // Importa decorador de componente y ciclo de vida OnInit
import { CommonModule } from '@angular/common';   // Módulo común de Angular (ngIf, ngFor, etc.)
import { IonicModule } from '@ionic/angular';     // Componentes de Ionic
import { Router } from '@angular/router';         // Servicio para navegar entre páginas
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación
import { CartService, Product } from 'src/app/services/cart.service'; // Servicio del carrito y modelo de producto

@Component({
  selector: 'app-profile',                        // Selector del componente (<app-profile>)
  templateUrl: './profile.page.html',             // Ruta de la vista HTML
  styleUrls: ['./profile.page.scss'],             // Estilos SCSS de la página
  standalone: true,                               // Componente standalone (no necesita módulo propio)
  imports: [CommonModule, IonicModule],           // Importa módulos que se usan en la vista
})
export class ProfilePage implements OnInit {
  // Arreglo donde se almacenan los productos del carrito
  cart: Product[] = [];

  constructor(
    private authService: AuthService,  // Servicio para login/logout
    private router: Router,            // Router para navegar entre páginas
    private cartService: CartService   // Servicio que maneja el carrito
  ) {}

  // Método que se ejecuta al inicializar la página
  ngOnInit() {
    // Se carga el carrito desde el servicio CartService
    this.cart = this.cartService.getCart();
  }

  // Función para cerrar sesión
  logout() {
    this.authService.logout();                        // Llama al servicio de autenticación para cerrar sesión
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al login y reemplaza la URL (para que no se pueda volver con "atrás")
  }
}
