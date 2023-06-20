import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username!: string;
  password!: string;
  isLoading: boolean = false;
  message: string = "";

  registerForm!: FormGroup;

  constructor(private _userService: UserService,
    private _router: Router,
    private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const user = {
      fullName: this.registerForm.get("fullName")?.value,
      username: this.registerForm.get("username")?.value,
      password: this.registerForm.get("password")?.value
    }
    this.isLoading = true;
    this._userService.register(user).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.message = "Signing up successful! Logging in...";
        } else {
          this.message = "Something went wrong!";
        }
      },
      error: (error) => {
        this.message = "Something went wrong!";
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
