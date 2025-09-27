import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, RouterOutlet]
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['tabs/tabs/home'], { replaceUrl: true });
    }
  }

  // Login clásico
  login() {
    const result = this.authService.login(this.username, this.password);

    if (!result.success) {
      this.error = result.message;
      return;
    }

    this.error = '';
    this.router.navigate(['tabs/tabs/home'], { replaceUrl: true });
  }

  // Login con Google
  async loginGoogle() {
    try {
      const res: { success: boolean; message: string } =
        await this.authService.loginWithGoogle();
      console.log(res.message);

      if (res.success) {
        this.router.navigate(['tabs/tabs/home'], { replaceUrl: true });
      } else {
        this.error = res.message;
      }
    } catch (error) {
      console.error('Error en login Google:', error);
      this.error = 'Error al iniciar sesión con Google.';
    }
  }
}
