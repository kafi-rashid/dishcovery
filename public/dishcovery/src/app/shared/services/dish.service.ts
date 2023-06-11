import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../models/dishes.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  baseUrl: string = "http://localhost:3000/dishes";

  constructor(private _http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this._http.get<Dish[]>(this.baseUrl);
  }

  getDishById(dishId: string): Observable<Dish> {
    return this._http.get<Dish>(this.baseUrl + "/" + dishId);
  }

  getDishCount(): Observable<any> {
    return this._http.get<any>(this.baseUrl + "/count");
  }

}
