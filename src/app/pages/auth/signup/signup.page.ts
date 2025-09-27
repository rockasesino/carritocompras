import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class SignupPage {
  // 🔹 Variables enlazadas al formulario
  username: string = '';
  email: string = '';
  password: string = '';

  // 🔹 Para mostrar mensajes
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método de registro
  signup() {
    // 1. Validar que no haya campos vacíos
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
      return;
    }

    // 2. Registrar usando el servicio de autenticación
    const result = this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    });

    // 3. Si falla → mostrar error
    if (!result.success) {
      this.errorMessage = result.message;
      this.successMessage = '';
      return;
    }

    // 4. Si funciona → mostrar éxito
    this.successMessage = result.message;
    this.errorMessage = '';

    // 5. Redirigir automáticamente al login en 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
