import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, RouterOutlet]   // 👈 Importamos FormsModule aquí también
})
export class LoginPage {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const result = this.authService.login(this.username, this.password);
    if (!result.success) {
      this.error = result.message;
      return;
    }

    this.error = '';
    this.router.navigate(['/products']); // Ajusta a tu página principal
  }
}

