import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule]
})
export class ProductDetailPage {
  product!: Product;
  quantity: number = 1;

  products: Product[] = [
    { id: 1, name: 'Producto 1', price: 15999, image: 'assets/products/product1.jpg' },
    { id: 2, name: 'Producto 2', price: 29999, image: 'assets/products/product2.jpg' },
    { id: 3, name: 'Producto 3', price: 9999, image: 'assets/products/product3.jpg' },
    { id: 4, name: 'Producto 4', price: 49999, image: 'assets/products/product4.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id)!;
  }

  addToCart(product: Product) {
    console.log(`Agregar ${this.quantity} de ${product.name} al carrito`);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
