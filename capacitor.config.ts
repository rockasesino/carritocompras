import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuempresa.tuapp',
  appName: 'CarritoApp',
  webDir: 'www',
  plugins: {
    SocialLogin: {
      google: {
        webClientId: '706216325647-h14g47sl1vsk7b1d9upm1njtqruisce7.apps.googleusercontent.com',
        mode: 'offline' // "offline" = refresco de token, "online" = solo sesión
      }
    }
  }
};