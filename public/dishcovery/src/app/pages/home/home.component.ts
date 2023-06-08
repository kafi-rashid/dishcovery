import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/models/dishes.model';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dishes: Dish[] = new Array<Dish>();

  constructor(private _dishService: DishService) {}

  ngOnInit(): void {
    this.getDishes();  
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
}