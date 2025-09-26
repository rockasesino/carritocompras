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
  username: string = '';
  email: string = '';
  password: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
      return;
    }

    const result = this.authService.register({ username: this.username, email: this.email, password: this.password });

    if (!result.success) {
      this.errorMessage = result.message;
      this.successMessage = '';
      return;
    }

    this.successMessage = result.message;
    this.errorMessage = '';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
