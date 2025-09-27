import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// 🔹 Interfaz que define la estructura de un producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-detail',                          // Nombre del componente
  templateUrl: './product-detail.page.html',               // HTML asociado
  styleUrls: ['./product-detail.page.scss'],               // Estilos específicos
  standalone: true,                                        // Componente standalone (Angular 15+)
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule]
})
export class ProductDetailPage {
  // 🔹 Producto seleccionado (se obtiene según el id en la ruta)
  product!: Product;

  // 🔹 Cantidad seleccionada por el usuario (default: 1)
  quantity: number = 1;

  // 🔹 Lista de productos disponible (mock de ejemplo)
  products: Product[] = [
    { id: 1, name: 'Producto 1', price: 15999, image: 'assets/products/product1.jpg' },
    { id: 2, name: 'Producto 2', price: 29999, image: 'assets/products/product2.jpg' },
    { id: 3, name: 'Producto 3', price: 9999,  image: 'assets/products/product3.jpg' },
    { id: 4, name: 'Producto 4', price: 49999, image: 'assets/products/product4.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    // 📌 Obtiene el "id" desde la URL (ej: /product-detail/2 → id=2)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 📌 Busca el producto en la lista según el id
    this.product = this.products.find(p => p.id === id)!;
  }

  // 🔹 Agregar producto al carrito
  addToCart(product: Product) {
    console.log(`Agregar ${this.quantity} de ${product.name} al carrito`);
    // Aquí luego deberías usar CartService.addProduct(product, this.quantity)
  }

  // 🔹 Ir al carrito
  goToCart() {
    this.router.navigate(['/cart']);
  }
}

