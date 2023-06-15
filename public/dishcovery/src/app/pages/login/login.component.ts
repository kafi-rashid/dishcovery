import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  isLoginFailed: boolean = false;
  message: string = "";

  constructor(private _authService: AuthService,
    private _router: Router) {}

  onSubmit(loginForm: any) {
    this.isLoginFailed = false;
    this._authService.auth(loginForm.value).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data));
          this._authService.setAuthState(true);
          this._router.navigate(["/"]);
          this.isLoginFailed = false;
        } else {
          this.isLoginFailed = true;
          this.message = response["message"];
        }
      },
      error: (error) => {
        console.log(error);
        this.isLoginFailed = true;
        this.message = error["message"];
      }
    });
  }

}
