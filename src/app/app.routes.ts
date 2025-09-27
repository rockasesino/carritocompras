import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // 🔹 Ruta principal de tabs (usa lazy loading de rutas hijas)
    path: 'tabs',
    loadChildren: () => 
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    // 🔹 Ruta hacia la página de login
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then(m => m.LoginPage),
  },
  {
    // 🔹 Ruta hacia la página de registro (signup)
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.page').then(m => m.SignupPage),
  },
  {
    // 🔹 Redirección por defecto:
    // si la URL está vacía, te lleva a /login
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
