import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/models/dishes.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dishes: Dish[] = new Array<Dish>();
  activeIndex: number = 0;
  dishCount: number = 0;
  categories: string[] = [];

  constructor(private _dishService: DishService,
    private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getDishes();
    this.getDishCount();
    this.getCategories();
    setInterval(() => {
      this.activeIndex = this.activeIndex + 1;
      if (this.activeIndex >= this.dishes.length) {
        this.activeIndex = 0;
      }
    }, 5000)
  }

  getDishes() {
    this._dishService.getDishes().subscribe({
      next: (dishes: Dish[]) => {
        this.dishes = dishes;        
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }

  getDishCount() {
    this._dishService.getDishCount().subscribe({
      next: (response: any) => {
        this.dishCount = response;        
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