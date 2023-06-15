import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish, Response } from '../models/dishes.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  baseUrl: string = "http://localhost:3000/dishes";

  constructor(private _http: HttpClient) { }

  getDishes(query: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + query);
  }

  getDishById(dishId: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + "/" + dishId);
  }

  getDishCount(query: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + "/count" + query);
  }

}
