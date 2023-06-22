import { Component, OnInit } from '@angular/core';
import { Dish, Response } from 'src/app/shared/models/dishes.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { DishService } from 'src/app/shared/services/dish.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dishes: Dish[] = new Array<Dish>();
  activeIndex: number = 0;
  dishCount: number = 0;
  userCount: number = 0;
  categories: string[] = [];
  offset: number = 0;
  count: number = 8;

  constructor(private _dishService: DishService,
    private _categoryService: CategoryService,
    private _userService: UserService) {}

  ngOnInit(): void {
    this.getDishes();
    this.getDishCount();
    this.getCategories();
    this.getUserCount();
    setInterval(() => {
      this.activeIndex = this.activeIndex + 1;
      if (this.activeIndex >= this.dishes.length) {
        this.activeIndex = 0;
      }
    }, 5000)
  }

  getDishes() {
    let query: string = "?offset=" + this.offset + "&count=" + this.count;
    this._dishService.getDishes(query).subscribe({
      next: (response: Response) => {
        this.dishes = response.data;        
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }

  getDishCount() {
    this._dishService.getDishCount("").subscribe({
      next: (response: any) => {
        this.dishCount = response.data;
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }

  getUserCount() {
    this._userService.getUserCount().subscribe({
      next: (response: any) => {
        this.userCount = response.data;
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;        
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }
}