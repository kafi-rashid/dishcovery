import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish, Response } from '../models/dishes.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  baseUrl: string = environment.baseUrlBackend + "dishes";
  
  constructor(private _http: HttpClient) { }

  getDishes(query: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + query);
  }

  addDish(dish: Dish): Observable<Response> {
    return this._http.post<Response>(this.baseUrl, dish);
  }

  fullUpdateDish(dish: Dish): Observable<Response> {
    return this._http.put<Response>(this.baseUrl + '/' + dish._id, dish);
  }

  partialUpdateDish(dish: Dish): Observable<Response> {
    return this._http.patch<Response>(this.baseUrl + '/' + dish._id, dish);
  }

  getDishById(dishId: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + "/" + dishId);
  }

  getDishCount(query: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + "/count" + query);
  }

  deleteDish(dish: Dish): Observable<Response> {
    return this._http.delete<Response>(this.baseUrl + '/' + dish._id);
  }

}
