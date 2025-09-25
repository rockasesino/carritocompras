import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

// 👇 importar componentes de Ionic standalone
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonButton
  ]
})
export class ProfilePage implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  ionViewWillEnter() {
    this.loadUser();
  }

  private loadUser() {
    this.user = this.authService.getUser();
  }

  logout() {
    console.log('🚪 Cerrando sesión...');
    this.authService.logout();

    // ✅ Redirige al login y reemplaza el historial de navegación
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
      console.log('✅ Sesión cerrada y redirigido a login');
    });
  }
}
