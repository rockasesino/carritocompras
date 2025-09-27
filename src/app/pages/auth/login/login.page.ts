// 🔹 Importaciones necesarias
import { Component, OnInit } from '@angular/core';           // Decorador y ciclo de vida OnInit
import { FormsModule } from '@angular/forms';               // Para [(ngModel)] en los inputs
import { IonicModule } from '@ionic/angular';               // Componentes de Ionic (ion-input, ion-button, etc.)
import { CommonModule } from '@angular/common';             // Directivas básicas de Angular (*ngIf, *ngFor)
import { Router, RouterLink, RouterOutlet } from '@angular/router'; // Para la navegación entre páginas
import { AuthService } from '../../../services/auth.service'; // Servicio de autenticación personalizado

// 🔹 Decorador que define el componente
@Component({
  selector: 'app-login',                                   // Nombre de la etiqueta del componente
  templateUrl: './login.page.html',                        // Archivo de la vista HTML
  styleUrls: ['./login.page.scss'],                        // Estilos de la página
  standalone: true,                                        // Es un componente standalone (sin módulo tradicional)
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, RouterOutlet] 
  // Importa módulos y directivas que puede usar en su template
})
export class LoginPage implements OnInit {
  // Variables enlazadas con el formulario
  username: string = '';   // Guarda el usuario ingresado
  password: string = '';   // Guarda la contraseña ingresada
  error: string = '';      // Guarda el mensaje de error si ocurre

  // Inyección de dependencias: se inyecta el AuthService y el Router
  constructor(private authService: AuthService, private router: Router) {}

  // Se ejecuta al cargar la página
  ngOnInit() {
    // Si ya hay un usuario logueado, redirige directamente al home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['tabs/tabs/home'], { replaceUrl: true });
    }
  }

  // 🔹 Método de login clásico con usuario y contraseña
  login() {
    // Llama al servicio de autenticación
    const result = this.authService.login(this.username, this.password);

    if (!result.success) {
      // Si falla, muestra el mensaje de error
      this.error = result.message;
      return;
    }

    // Si es exitoso, limpia el error y navega al home
    this.error = '';
    this.router.navigate(['tabs/tabs/home'], { replaceUrl: true });
  }

  // 🔹 Método de login con Google
  async loginGoogle() {
    try {
      // Llama al método loginWithGoogle del servicio
      const res: { success: boolean; message: string } =
        await this.authService.loginWithGoogle();
      console.log(res.message);

      if (res.success) {
        // Si es exitoso, redirige al home
        this.router.navigate(['tabs/tabs/home'], { replaceUrl: true });
      } else {
        // Si falla, muestra el error
        this.error = res.message;
      }
    } catch (error) {
      // Captura cualquier error inesperado en el proceso
      console.error('Error en login Google:', error);
      this.error = 'Error al iniciar sesión con Google.';
    }
  }
}
