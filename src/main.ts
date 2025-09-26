import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// ✅ Importar los iconos que usas
import { addIcons } from 'ionicons';
import { homeOutline, pricetagOutline, cartOutline, personCircleOutline } from 'ionicons/icons';

import { SocialLogin } from '@capgo/capacitor-social-login';

// ✅ Registrar los iconos globalmente
addIcons({
  homeOutline,
  pricetagOutline,
  cartOutline,
  personCircleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

SocialLogin.initialize({
  google: {
    webClientId: '706216325647-h14g47sl1vsk7b1d9upm1njtqruisce7.apps.googleusercontent.com',
    mode: 'offline'
  }
});