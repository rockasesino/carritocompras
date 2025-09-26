import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from 'src/app/services/cart.service'; // 👈 importa el servicio

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, RouterOutlet],
})
export class TabsPage implements OnInit {
  cartCount = 0; // 👈 contador del carrito

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // 👀 suscripción al observable del carrito
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
