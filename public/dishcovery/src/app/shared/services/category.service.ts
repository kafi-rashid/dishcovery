import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = environment.baseUrlBackend + "categories";

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl);
  }
  
}
