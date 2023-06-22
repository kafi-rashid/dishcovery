import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Dish, Response } from 'src/app/shared/models/dishes.model';
import { User } from 'src/app/shared/models/user.model';
import { DishService } from 'src/app/shared/services/dish.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = new Array<User>();
  userCount: number = 0;
  offset: number = 0;
  count: number = 10;
  search: string = "";

  constructor(private _activatedRoute: ActivatedRoute,
    private _userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserCount();
  }

  getUsers() {
    let query: string = "?offset=" + this.offset + "&count=" + this.count + "&search=" + this.search;
    this._userService.getUsers(query).subscribe({
      next: (response: Response) => {
        this.users = response.data;    
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      error: (error) => {
        console.log("Component: Users", error);
      }
    });
  }

  getUserCount() {
    this._userService.getUserCount().subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.userCount = response.data;
        }
      },
      error: (error) => {
        console.log("Component: Users", error);
      }
    });
  }

  prev() {
    this.offset = this.offset - this.count;
    this.getUsers();
  }

  next() {
    this.offset = this.offset + this.count;
    this.getUsers();
  }

  disablePrev() {
    return this.offset === 0;
  }

  disableNext() {
    return(+this.offset + this.count) >= this.userCount;
  }

  getCategory(categories: Category[]) {
    let list: string[] = [];
    categories.map((item: Category) => {
      list.push(item.name);
    });
    return list.join(", ");
  }
  
  searchDish() {
    this.getUsers();
    this.getUserCount();
  }
}
