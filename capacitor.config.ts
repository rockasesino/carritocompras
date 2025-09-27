import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carolina.carrito',
  appName: 'Carritoapp',
  webDir: 'www',
  plugins: {
    SocialLogin: {
      google: {
        clientId: '706216325647-h14g47sl1vsk7b1d9upm1njtqruisce7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      },
    },
  }
};

export default config;
