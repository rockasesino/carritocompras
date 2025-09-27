import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs', // 👉 ruta principal donde vive el layout de tabs
    component: TabsPage, // 👉 componente base que contiene el <ion-tabs>
    children: [
      {
        path: 'home', // 👉 ruta de la pestaña de inicio
        loadComponent: () =>
          import('../../home/home.page').then(m => m.HomePage), // 👈 carga la página Home de manera lazy (bajo demanda)
      },
      {
        path: 'products', // 👉 pestaña de productos
        loadComponent: () =>
          import('../products/products.page').then(m => m.ProductsPage), // 👈 carga ProductsPage
      },
      {
        path: 'product-detail/:id', // 👉 ruta con parámetro dinámico (ejemplo: product-detail/1)
        loadComponent: () =>
          import('../product-detail/product-detail.page').then(m => m.ProductDetailPage), // 👈 carga el detalle de un producto
      },
      {
        path: 'cart', // 👉 pestaña del carrito
        loadComponent: () =>
          import('../cart/cart.page').then(m => m.CartPage), // 👈 carga la página del carrito
      },
      {
        path: 'profile', // 👉 pestaña del perfil de usuario
        loadComponent: () =>
          import('../profile/profile.page').then(m => m.ProfilePage), // 👈 carga la página de perfil
      },
    ],
  },
];
