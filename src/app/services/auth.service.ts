import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

// 🔹 Interfaz para representar un usuario
export interface User {
  username: string;
  email: string;
  password: string;
  avatar?: string; // 👈 campo opcional para la foto de perfil
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = []; // 🔹 Lista de usuarios registrados (local)
  private loggedInUser: User | null = null; // 🔹 Usuario actualmente logueado

  constructor() {
    this.loadFromStorage(); // 👈 al iniciar el servicio, cargamos datos desde localStorage
  }

  // -------------------------
  // 🔹 Registro clásico
  // -------------------------
  register(user: User): { success: boolean; message: string } {
    // ✅ verificar si ya existe usuario con mismo username o email
    const exists = this.users.find(u => u.username === user.username || u.email === user.email);
    if (exists) {
      return { success: false, message: 'El usuario o correo ya existe.' };
    }

    // ✅ asignar avatar por defecto si no se envía
    if (!user.avatar) {
      user.avatar = 'https://www.w3schools.com/howto/img_avatar.png';
    }

    // ✅ guardar usuario en lista
    this.users.push(user);
    this.saveToStorage(); // 🔹 persistir en localStorage
    return { success: true, message: 'Usuario registrado con éxito.' };
  }

  // -------------------------
  // 🔹 Login clásico
  // -------------------------
  login(usernameOrEmail: string, password: string): { success: boolean; message: string } {
    // ✅ buscar usuario que coincida con username/email y password
    const user = this.users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos.' };
    }

    // ✅ asignar usuario logueado y guardar en storage
    this.loggedInUser = user;
    this.saveToStorage();
    return { success: true, message: 'Login exitoso.' };
  }

  // -------------------------
  // 🔹 Login con Google
  // -------------------------
  async loginWithGoogle(): Promise<{ success: boolean; message: string }> {
    try {
      // ✅ llamar al plugin de login social
      const response = await SocialLogin.login({
        provider: 'google',
        options: { scopes: ['email', 'profile'], forceRefreshToken: true }
      });

      const googleUser = response.result as any;

      console.log('Google User completo:', googleUser); // 🔹 importante para debug

      // ✅ extraer datos del usuario de Google
      const email = googleUser?.email ?? ''; 
      const username = googleUser?.name || (email ? email.split('@')[0] : 'Usuario');

      // ✅ si ya existe el usuario lo usamos, si no lo creamos
      let user = this.users.find(u => u.email === email);

      if (!user) {
        user = {
          username: username,
          email: email,
          password: '', // 👈 vacío porque viene de Google
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
    this.loggedInUser = null; // ✅ borrar sesión en memoria
    localStorage.removeItem('loggedInUser'); // ✅ borrar del storage
  }

  // -------------------------
  // 🔹 Obtener usuario actual
  // -------------------------
  getUser() {
    // ✅ si no hay usuario en memoria, cargar desde localStorage
    if (!this.loggedInUser) {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser && storedUser !== 'null') {
        this.loggedInUser = JSON.parse(storedUser);
      }
    }
    return this.loggedInUser;
  }

  // ✅ verificar si hay usuario logueado
  isLoggedIn() {
    return this.getUser() !== null;
  }

  // ✅ alias de isLoggedIn
  hasSession(): boolean {
    return this.isLoggedIn();
  }

  // -------------------------
  // 🔹 Métodos de almacenamiento local
  // -------------------------
  private saveToStorage() {
    // ✅ guardar lista de usuarios
    localStorage.setItem('users', JSON.stringify(this.users));
    // ✅ guardar usuario actual si está logueado
    if (this.loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }

  private loadFromStorage() {
    // ✅ recuperar usuarios y sesión guardada
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
