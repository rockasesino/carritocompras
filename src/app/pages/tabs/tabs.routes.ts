import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../home/home.page').then(m => m.HomePage), // 
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../products/products.page').then(m => m.ProductsPage),
      },
      {
        path: 'product-detail/:id',
        loadComponent: () =>
          import('../product-detail/product-detail.page').then(m => m.ProductDetailPage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../cart/cart.page').then(m => m.CartPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then(m => m.ProfilePage),
      },

    ],
  },
];
