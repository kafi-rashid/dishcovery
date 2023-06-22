import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Dish, Response } from 'src/app/shared/models/dishes.model';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-manage-dishes',
  templateUrl: './manage-dishes.component.html',
  styleUrls: ['./manage-dishes.component.css']
})
export class ManageDishesComponent implements OnInit {

  dishes: Dish[] = new Array<Dish>();
  dishCount: number = 0;
  offset: number = 0;
  count: number = 10;
  search: string = "";

  constructor(private _dishService: DishService,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getDishes();
    this.getDishCount();
  }

  getDishes() {
    let query: string = "?offset=" + this.offset + "&count=" + this.count + "&search=" + this.search;
    this._dishService.getDishes(query).subscribe({
      next: (response: Response) => {
        this.dishes = response.data;    
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }

  getDishCount() {
    let query: string = "?search=" + this.search;
    this._dishService.getDishCount(query).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.dishCount = response.data;
        }
      },
      error: (error) => {
        console.log("Component: Dishes", error);
      }
    });
  }

  prev() {
    this.offset = this.offset - this.count;
    this.getDishes();
  }

  next() {
    this.offset = this.offset + this.count;
    this.getDishes();
  }

  disablePrev() {
    return this.offset === 0;
  }

  disableNext() {
    return(+this.offset + this.count) >= this.dishCount;
  }

  getCategory(categories: Category[]) {
    let list: string[] = [];
    categories.map((item: Category) => {
      list.push(item.name);
    });
    return list.join(", ");
  }
  
  searchDish() {
    this.getDishes();
    this.getDishCount();
  }
}
