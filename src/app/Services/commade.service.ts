import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommadeService {
  private apiUrl = "http://localhost:8080/restaurant/listRestaurant";

  constructor(private httpclient:HttpClient) { }




}
