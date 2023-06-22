import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish, Response } from 'src/app/shared/models/dishes.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userForm!: FormGroup;
  user: User = new Dish();
  userId: string = "";
  isLoading: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _location: Location) {

    this.userForm = this._formBuilder.group({
      _id: [''],
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = this._activatedRoute.snapshot.params["userId"];
    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  get formControl() { return this.userForm.controls; }

  getUser(userId: string) {
    this._userService.getUserById(userId).subscribe({
      next: (response: Response) => {
        console.log(response);
        
        if (response.status === 200) {
          const responseData = response.data;
          this.userForm.patchValue({
            _id: responseData._id,
            fullName: responseData.fullName,
            username: responseData.username,
            password: responseData.password
          });
        }
      },
      error: (error) => {
        console.log("Component: User", error);        
      }
    });
  }
  
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    
    // Retrieve the form values and assign them to the dish object
    this.user = this.userForm.value;
    
    // Perform further actions with the dish object, such as sending it to an API

    console.log(this.user);
    
    // Reset the form
    // this.userForm.reset();
  }

  goBack(event: any) {
    event.preventDefault();
    this._location.back();
  }

  confirmDelete(event: any) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this user?")) {
      this.delete();
    } else {

    }
  }

  delete() {
    this._userService.deleteUser(this.userForm.value).subscribe({
      next: (response: Response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this._location.back();
      }
    })
  }

}
