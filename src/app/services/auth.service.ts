import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.user = { username };
      return true;
    }
    return false;
  }

  signup(username: string, password: string): boolean {
    this.user = { username, password };
    return true;
  }

  logout() {
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  // 👇 Aquí está lo que falta
  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
