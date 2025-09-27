import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProductsPage {
  products: Product[] = [
    { id: 1, name: 'Audífonos Bluetooth* Touch True Wireless con Active Noise Cancelling y Enviromental Noise Cancelling', price: 139900, image: 'assets/products/audi1.jpg' },
    { id: 2, name: 'Audífonos Bluetooth con cancelación de ruido, negros', price: 279900, image: 'assets/products/audi2.jpg' },
    { id: 3, name: 'Amplificador portátil Bluetooth con reproductor MP3', price: 139900, image: 'assets/products/audi3.jpg' },
    { id: 4, name: 'Mini Parlante Bluetooth* con forma de puerco', price: 79900, image: 'assets/products/audi4.jpg' },
  ];

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  addToCart(product: Product) {
    this.cartService.addProduct({ ...product, quantity: 1 });
    console.log('Agregado al carrito:', product);
  }

  viewDetails(product: Product) {
    this.router.navigate(['tabs/tabs/product-detail', product.id]);
  
  }

  goToCart() {
  this.router.navigate(['tabs/tabs/cart']);
  }

}
