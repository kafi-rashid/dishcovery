import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish, Response } from 'src/app/shared/models/dishes.model';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dishId: string = "";
  dish: Dish = new Dish();

  constructor(private httpClient: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _dishService: DishService) {}

  ngOnInit(): void {
    this.dishId = this._activatedRoute.snapshot.params["dishId"];
    if (this.dishId) {
      this.getGame(this.dishId);
    }
  }

  getGame(dishId: string) {
    this._dishService.getDishById(dishId).subscribe({
      next: (response: Response) => {
        if (response.status === 200) {
          this.dish = response.data;
        }
      },
      error: (error) => {
        console.log("Component: Game", error);        
      }
    });
  }

}
