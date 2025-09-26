import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ProfilePage {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // 👈 limpia sesión
    this.router.navigate(['/login'], { replaceUrl: true }); // 👈 regresa al login
  }
}
