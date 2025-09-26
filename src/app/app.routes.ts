import { Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then(m => m.HomePage), // 
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.page').then(m => m.ProductsPage),
      },
      {
        path: 'product-detail/:id',
        loadComponent: () =>
          import('./pages/product-detail/product-detail.page').then(m => m.ProductDetailPage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.page').then(m => m.CartPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.page').then(m => m.SignupPage),
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

