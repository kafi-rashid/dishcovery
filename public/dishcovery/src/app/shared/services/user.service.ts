import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Response } from '../models/dishes.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = environment.baseUrlBackend + "users";
  loggedInStatus = true;
  
  header = {
    "content-type": "application/json"
  }

  constructor(private _http: HttpClient) { }

  register(user: User): Observable<Response> {
    return this._http.post<Response>(this.baseUrl, user, { headers: this.header });
  }

  getUsers(query: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + '?query', { headers: this.header });
  }

  getUserById(userId: string): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + '/' + userId, { headers: this.header });
  }

  getUserCount(): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + '/count', { headers: this.header });
  }

  deleteUser(user: User): Observable<Response> {
    return this._http.delete<Response>(this.baseUrl + '/' + user._id);
  }

}
