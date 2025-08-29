import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable,Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080";  
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  public userUpdated$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setAuthData(response.token, {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role
          });

          this.userUpdated$.next();
        }
      })
    );
  }

  register(userData: { name: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  private setAuthData(token: string, user: any): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  removeAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

    this.userUpdated$.next();

  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}