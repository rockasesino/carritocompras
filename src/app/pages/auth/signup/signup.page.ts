import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink,RouterOutlet]
})
export class SignupPage {
  username: string = '';
  email: string = '';
  password: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  signup() {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
      return;
    }

    // Aquí conectas con tu backend o lógica de registro
    console.log('Registro:', {
      username: this.username,
      email: this.email,
      password: this.password
    });

    this.successMessage = 'Usuario registrado con éxito';
    this.errorMessage = '';

    // Redirigir automáticamente al login después de 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
