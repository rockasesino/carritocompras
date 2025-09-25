import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.hasSession()) { // ✅ usamos el nuevo alias del AuthService
      return true; // Usuario autenticado, acceso permitido
    } else {
      this.router.navigate(['/login']); // 🚨 redirige al login si no está logueado
      return false;
    }
  }
}


