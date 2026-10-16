import { Injectable } from '@angular/core';

export type UserRole = 'ADMIN' | 'CLIENT';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'isLoggedIn';
  private readonly ROLE_KEY = 'userRole';
  private readonly USER_KEY = 'currentUser';

  constructor() { }

  login(username: string, pass: string): boolean {
    if (username === 'admin' && pass === 'admin123') {
      sessionStorage.setItem(this.TOKEN_KEY, 'true');
      sessionStorage.setItem(this.ROLE_KEY, 'ADMIN');
      sessionStorage.setItem(this.USER_KEY, 'admin');
      return true;
    } else if (username === 'cliente' && pass === 'cliente123') {
      sessionStorage.setItem(this.TOKEN_KEY, 'true');
      sessionStorage.setItem(this.ROLE_KEY, 'CLIENT');
      sessionStorage.setItem(this.USER_KEY, 'cliente');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.ROLE_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) === 'true';
  }

  getRole(): UserRole | null {
    return sessionStorage.getItem(this.ROLE_KEY) as UserRole | null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isClient(): boolean {
    return this.getRole() === 'CLIENT';
  }

  getCurrentUser(): string | null {
    return sessionStorage.getItem(this.USER_KEY);
  }
}