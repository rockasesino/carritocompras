import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { TabsPage } from './pages/tabs/tabs.page';

export const routes: Routes = [
  // 🔑 Rutas públicas (sin tabs)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.page').then((m) => m.SignupPage),
  },

  // 🔑 Rutas con tabs protegidas por AuthGuard
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.page').then((m) => m.ProductsPage),
      },
      {
        path: 'product-detail/:id',
        loadComponent: () =>
          import('./pages/product-detail/product-detail.page').then(
            (m) => m.ProductDetailPage
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      // 👇 Redirección interna dentro de tabs
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },

  // 🔑 Redirección global por defecto
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
