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
    // 👇 Si ya hay sesión activa, mandamos directo al home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs/home'], { replaceUrl: true });
    }
  }

  login() {
    const result = this.authService.login(this.username, this.password);

    if (!result.success) {
      this.error = result.message;
      return;
    }

    this.error = '';

    // ✅ Redirigimos al home dentro de tabs, sin volver al login
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }
}
