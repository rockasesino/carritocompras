import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ProfilePage {
  user: any;

  constructor(private router: Router) {}

  logout() {
    // Aquí va la lógica de cierre de sesión
    console.log("Sesión cerrada");

    // Limpiar datos de usuario (si los guardas en localStorage, sessionStorage, etc.)
    localStorage.clear();

    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }
}
