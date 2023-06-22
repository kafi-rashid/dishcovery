import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem('user');
    if (user) {
      let token = JSON.parse(user).token;
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
    }
    return next.handle(request);
  }
}
