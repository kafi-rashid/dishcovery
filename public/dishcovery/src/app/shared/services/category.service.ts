import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = "http://localhost:3000/categories"

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl);
  }
  
}
