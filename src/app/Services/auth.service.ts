import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/v1/auth";
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  public userUpdated$ = new BehaviorSubject<void | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          this.setAuthData(response.token, {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role
          });
          this.userUpdated$.next();
        }
      }),
      catchError(error => throwError(() => new Error(error.error.message || 'Login failed')))
    );
  }

  register(userData: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => throwError(() => new Error(error.error.message || 'Registration failed')))
    );
  }

  private setAuthData(token: string, user: any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  removeAuthData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.userUpdated$.next();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
