import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Response } from '../models/dishes.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrlBackend + "auth";
  private loggedInStatus = new BehaviorSubject<boolean>(this.getLoggedInStatusFromLocalStorage());

  constructor(private _http: HttpClient) {}

  auth(user: User): Observable<Response> {
    return this._http.post<Response>(this.baseUrl, user);
  }

  setAuthState(state: boolean) {
    localStorage.setItem("isLoggedIn", state.toString());
    this.loggedInStatus.next(state);
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  private getLoggedInStatusFromLocalStorage(): boolean {
    const status = localStorage.getItem("isLoggedIn");
    return status === "true";
  }

  getUser(): Observable<User> {
    const user = localStorage.getItem("user");
    if (user) {
      return of(JSON.parse(user));
    }
    else {
      return of(new User())
    }
  }
}
