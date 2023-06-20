import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Response } from '../models/dishes.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:3000/users";
  loggedInStatus = true;
  
  header = {
    "content-type": "application/json"
  }

  constructor(private _http: HttpClient) { }

  register(user: User): Observable<Response> {
    return this._http.post<Response>(this.baseUrl, user, { headers: this.header });
  }

}
