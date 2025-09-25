import { Injectable } from '@angular/core';

export interface User {
  username: string;
  email: string;
  password: string;
  avatar?: string; // 👈 campo opcional
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {
    this.loadFromStorage(); // 👈 cargar datos guardados al iniciar el servicio
  }

  // Registrar usuario
  register(user: User): { success: boolean; message: string } {
    const exists = this.users.find(u => u.username === user.username || u.email === user.email);
    if (exists) {
      return { success: false, message: 'El usuario o correo ya existe.' };
    }

    // ✅ Si no envía avatar, se asigna uno por defecto
    if (!user.avatar) {
      user.avatar = 'https://www.w3schools.com/howto/img_avatar.png';
    }

    this.users.push(user);
    this.saveToStorage();
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
    this.saveToStorage(); // ✅ guarda también el usuario logueado
    return { success: true, message: 'Login exitoso.' };
  }

  // ✅ Logout corregido
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser'); // borra la sesión
    // 🔥 Opcional: si quieres limpiar TODO (menos usuarios registrados)
    // localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Obtener usuario logueado
  getUser() {
    if (!this.loggedInUser) {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser && storedUser !== 'null') {
        this.loggedInUser = JSON.parse(storedUser);
      }
    }
    return this.loggedInUser;
  }

  // Verificar si hay sesión
  isLoggedIn() {
    return this.getUser() !== null;
  }

  // Alias para el guard
  hasSession(): boolean {
    return this.isLoggedIn();
  }

  // -------------------------------
  // Métodos privados para almacenamiento
  // -------------------------------
  private saveToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
    if (this.loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser'); // ✅ evita guardar null como string
    }
  }

  private loadFromStorage() {
    const storedUsers = localStorage.getItem('users');
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    if (storedUser && storedUser !== 'null') {
      this.loggedInUser = JSON.parse(storedUser);
    }
  }
}

