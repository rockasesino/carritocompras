import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// ✅ Importar los iconos que usas
import { addIcons } from 'ionicons';
import { homeOutline, pricetagOutline, cartOutline, personCircleOutline } from 'ionicons/icons';

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
