import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Interface} from 'node:readline';
import * as http from 'node:http';
interface Restaurant{

  name :string,
  description:string,
  adresse:string,
  phone:string,
  email:string;

}
@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url="http://localhost:8080/restaurant/listeRestaurantsName";

  constructor(private http:HttpClient) { }

  findByName():Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(this.url)

  }
}
