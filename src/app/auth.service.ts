import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "USER";
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User{
  email: string;
  //password: string;  // facultatif : mais attention, ce n’est **jamais** recommandé de renvoyer le mot de passe au frontend
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080";


  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http:HttpClient) {
    const user = this.getUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  private getUserFromStorage(): User | null {
    if (typeof  Storage !=='undefined' && localStorage){
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;}
    return null;
  }

  login(credentials:{email:string, password:string }):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/v1/auth/authenticate`,credentials)
  }

  register(userdata : {name:string,email:string,password:string,role:string}):Observable<any>{
    return this.http.post<RegisterRequest>(`${this.apiUrl}/api/v1/auth/register`,userdata);
  }
  saveUserData(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }


  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }
}