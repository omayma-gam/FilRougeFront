import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Plat } from '../models/plat.interface';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  private apiUrl = '/api/plats';  // Updated to use proxy path

  constructor(private http: HttpClient) { }

  getAllPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/all`);
  }

  getPlatsDisponiblesByRestaurant(restaurantId: number): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/restaurant/${restaurantId}`);
  }

  getPlatById(id: number): Observable<Plat> {
    return this.http.get<Plat>(`${this.apiUrl}/${id}`);
  }

  ajouterPlat(plat: Plat): Observable<any> {
    return this.http.post(`${this.apiUrl}`, plat);
  }

  modifierPlat(id: number, plat: Plat): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, plat);
  }

  supprimerPlat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}