import { Injectable } from '@angular/core';

export interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {}

  // Registrar usuario
  register(user: User): { success: boolean; message: string } {
    // Verifica si el usuario ya existe
    const exists = this.users.find(u => u.username === user.username || u.email === user.email);
    if (exists) {
      return { success: false, message: 'El usuario o correo ya existe.' };
    }

    this.users.push(user);
    return { success: true, message: 'Usuario registrado con éxito.' };
  }

  // Login
  login(usernameOrEmail: string, password: string): { success: boolean; message: string } {
    const user = this.users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }

    this.loggedInUser = user;
    return { success: true, message: 'Login exitoso.' };
  }

  // Logout
  logout() {
    this.loggedInUser = null;
  }

  // Obtener usuario logueado
  getUser() {
    return this.loggedInUser;
  }

  // Verificar si hay sesión
  isLoggedIn() {
    return this.loggedInUser !== null;
  }
}
