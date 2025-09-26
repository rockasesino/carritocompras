import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

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

  // -------------------------
  // 🔹 Registro clásico
  // -------------------------
  register(user: User): { success: boolean; message: string } {
    const exists = this.users.find(u => u.username === user.username || u.email === user.email);
    if (exists) {
      return { success: false, message: 'El usuario o correo ya existe.' };
    }

    if (!user.avatar) {
      user.avatar = 'https://www.w3schools.com/howto/img_avatar.png';
    }

    this.users.push(user);
    this.saveToStorage();
    return { success: true, message: 'Usuario registrado con éxito.' };
  }

  // -------------------------
  // 🔹 Login clásico
  // -------------------------
  login(usernameOrEmail: string, password: string): { success: boolean; message: string } {
    const user = this.users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }

    this.loggedInUser = user;
    this.saveToStorage();
    return { success: true, message: 'Login exitoso.' };
  }

  // -------------------------
  // 🔹 Login con Google
  // -------------------------
async loginWithGoogle(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await SocialLogin.login({
      provider: 'google',
      options: { scopes: ['email', 'profile'], forceRefreshToken: true }
    });

    const googleUser = response.result as any;

    console.log('Google User completo:', googleUser); // 🔹 importante para debug

    const email = googleUser?.email ?? ''; // si es undefined, usamos string vacío
    const username = googleUser?.name || (email ? email.split('@')[0] : 'Usuario');

    let user = this.users.find(u => u.email === email);

    if (!user) {
      user = {
        username: username,
        email: email,
        password: '',
        avatar: googleUser?.imageUrl || 'https://www.w3schools.com/howto/img_avatar.png'
      };
      this.users.push(user);
    }

    this.loggedInUser = user;
    this.saveToStorage();

    return { success: true, message: 'Login con Google exitoso.' };
  } catch (error) {
    console.error('Error en login con Google', error);
    return { success: false, message: 'Error al iniciar sesión con Google.' };
  }
}

  // -------------------------
  // 🔹 Logout
  // -------------------------
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }

  // -------------------------
  // 🔹 Sesión
  // -------------------------
  getUser() {
    if (!this.loggedInUser) {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser && storedUser !== 'null') {
        this.loggedInUser = JSON.parse(storedUser);
      }
    }
    return this.loggedInUser;
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  hasSession(): boolean {
    return this.isLoggedIn();
  }

  // -------------------------
  // 🔹 Almacenamiento
  // -------------------------
  private saveToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
    if (this.loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser');
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
