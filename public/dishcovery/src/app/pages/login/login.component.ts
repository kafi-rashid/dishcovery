import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'src/app/shared/models/dishes.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  environment = environment;
  username!: string;
  password!: string;
  isLoginFailed: boolean = false;
  message: string = "";

  constructor(private _authService: AuthService,
    private _router: Router) {}

  onSubmit() {
    const user: User = {
      username: this.username,
      password: this.password
    }
    this.isLoginFailed = false;
    this._authService.auth(user).subscribe({
      next: (response: Response) => {
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
