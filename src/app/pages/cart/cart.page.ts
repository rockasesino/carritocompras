import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartService, Product } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartPage implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  // eliminar producto
  removeItem(id: number) {
    this.cartService.removeProduct(id);
    this.cart = this.cartService.getCart(); // refrescar lista
  }

  // calcular total
  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
