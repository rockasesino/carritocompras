import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

// 🔹 Interface para tipar los productos
interface Product {
  id: number;     // Identificador único
  name: string;   // Nombre del producto
  price: number;  // Precio en COP
  image: string;  // Ruta a la imagen en assets
}

@Component({
  selector: 'app-products', // Nombre del selector del componente
  templateUrl: './products.page.html', // Vista asociada
  styleUrls: ['./products.page.scss'], // Estilos
  standalone: true, // ✅ Usamos Angular standalone components
  imports: [CommonModule, FormsModule, IonicModule] // Módulos necesarios
})
export class ProductsPage {
  // 📦 Lista de productos disponibles en la tienda
  products: Product[] = [
    { id: 1, name: 'Audífonos Bluetooth* Touch True Wireless con Active Noise Cancelling y Enviromental Noise Cancelling', price: 139900, image: 'assets/products/audi1.jpg' },
    { id: 2, name: 'Audífonos Bluetooth con cancelación de ruido, negros', price: 279900, image: 'assets/products/audi2.jpg' },
    { id: 3, name: 'Amplificador portátil Bluetooth con reproductor MP3', price: 139900, image: 'assets/products/audi3.jpg' },
    { id: 4, name: 'Mini Parlante Bluetooth* con forma de puerco', price: 79900, image: 'assets/products/audi4.jpg' },
  ];

  constructor(
    private router: Router,       // Para navegar entre páginas
    private cartService: CartService // Servicio de carrito compartido
  ) {}

  // 🛒 Método para agregar producto al carrito
  addToCart(product: Product) {
    this.cartService.addProduct({ ...product, quantity: 1 }); // Se agrega con cantidad = 1
    console.log('Agregado al carrito:', product);
  }

  // 🔎 Método para ver detalles del producto
  viewDetails(product: Product) {
    // Navega a la página de detalle con el ID del producto en la URL
    this.router.navigate(['tabs/tabs/product-detail', product.id]);
  }

  // 📦 Método para ir directamente al carrito
  goToCart() {
    this.router.navigate(['tabs/tabs/cart']);
  }
}
