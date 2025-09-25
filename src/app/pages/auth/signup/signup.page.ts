import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]   // 👈 Importar FormsModule aquí
})
export class SignupPage {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.message = 'Debes llenar todos los campos';
      return;
    }

    const success = this.authService.signup(this.username, this.password);

    if (success) {
      this.message = 'Usuario registrado con éxito 🎉';
      setTimeout(() => {
        this.router.navigate(['/login']);  // Redirige al login después de registrarse
      }, 1500);
    } else {
      this.message = 'El usuario ya existe ❌';
    }
  }
}
