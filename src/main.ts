import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// ✅ Importar los iconos que usas (para no tener problemas de "icon not found")
import { addIcons } from 'ionicons';
import { homeOutline, pricetagOutline, cartOutline, personCircleOutline } from 'ionicons/icons';

// ✅ Plugin para login social (Google, Facebook, etc.)
import { SocialLogin } from '@capgo/capacitor-social-login';

// ----------------------------------------------------
// 🔹 Registro global de los iconos
// Esto evita que Angular/Ionic lance warnings cuando
// tratas de usar <ion-icon name="home-outline">
// ----------------------------------------------------
addIcons({
  homeOutline,
  pricetagOutline,
  cartOutline,
  personCircleOutline,
});

// ----------------------------------------------------
// 🔹 Bootstrap de la app
// - Se arranca AppComponent
// - Se configura Ionic
// - Se configuran las rutas con pre-carga de módulos
// ----------------------------------------------------
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // mejora la navegación en Ionic
    provideIonicAngular(), // inicializa Ionic
    provideRouter(routes, withPreloading(PreloadAllModules)), // carga las rutas con prefetch
  ],
});

// ----------------------------------------------------
// 🔹 Inicialización de login con Google
// Debes poner aquí tu `webClientId` (de Google Console).
// - `mode: 'offline'` → te permite obtener refresh tokens
// ----------------------------------------------------
SocialLogin.initialize({
  google: {
    webClientId: '706216325647-h14g47sl1vsk7b1d9upm1njtqruisce7.apps.googleusercontent.com',
    mode: 'offline'
  }
});
