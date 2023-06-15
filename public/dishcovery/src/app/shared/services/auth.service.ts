import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = "http://localhost:3000/auth";
  isLoggedIn: boolean = false;

  constructor(private _http: HttpClient) { }

  auth(user: User): Observable<User> {
    return this._http.post<User>(this.baseUrl, user);
  }
  
  getAuthState(): Observable<boolean> {
    if (localStorage.getItem("isLoggedIn")) {
      return of(true);
    } else {
      return of(false);
    }
  }

  setAuthState(state: boolean) {
    localStorage.setItem("isLoggedIn", state.toString());
    this.isLoggedIn = state;
  }

  loggedIn() {
    return this.isLoggedIn;
  }

}
