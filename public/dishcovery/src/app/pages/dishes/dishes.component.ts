import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish, Response } from 'src/app/shared/models/dishes.model';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  dishes: Dish[] = new Array<Dish>();
  dishCount: number = 0;
  offset: number = 0;
  count: number = 8;
  search: string = "";

  constructor(private _dishService: DishService,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["search"]) {
        this.search = params["search"];
        this.getDishes();
        this.getDishCount();
      } else {
        this.search = "";
        this.getDishCount();
        this.getDishes();
      }
    });
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

}
