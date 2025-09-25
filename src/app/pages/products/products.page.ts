import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink, RouterOutlet] 
})
export class ProductsPage {
  products: Product[] = [
    { id: 1, name: 'Audífonos Bluetooth* Touch True Wireless con Active Noise Cancelling y Enviromental Noise Cancelling', price: 139.900, image: 'assets/products/audi1.jpg' },
    { id: 2, name: 'Audífonos Bluetooth con cancelación de ruido, negros', price: 279.900, image: 'assets/products/audi2.jpg' },
    { id: 3, name: 'Amplificador portátil Bluetooth con reproductor MP3', price: 139.900, image: 'assets/products/audi3.jpg' },
    { id: 4, name: 'Mini Parlante Bluetooth* con forma de puerco', price: 79.900, image: 'assets/products/audi4.jpg' },
    // agrega más productos según necesites
  ];

  addToCart(product: Product) {
    console.log('Agregar al carrito:', product);
    // Aquí luego puedes integrar con tu servicio de carrito
  }
}
