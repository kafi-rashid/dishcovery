import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = "http://localhost:3000/auth";

  constructor(private _http: HttpClient) { }

  auth(user: User): Observable<User> {
    return this._http.post<User>(this.baseUrl, user);
  }

  isAuth(): boolean {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

}
