import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish, Response } from 'src/app/shared/models/dishes.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dishId: string = "";
  dish: Dish = new Dish();
  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _dishService: DishService,
    private _authService: AuthService) {}

  ngOnInit(): void {
    this.dishId = this._activatedRoute.snapshot.params["dishId"];
    this._authService.getLoggedInStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
    if (this.dishId) {
      this.getDish(this.dishId);
    }
  }

  getDish(dishId: string) {
    this._dishService.getDishById(dishId).subscribe({
      next: (response: Response) => {
        if (response.status === 200) {
          this.dish = response.data;
        }
      },
      error: (error) => {
        console.log("Component: Dish", error);        
      }
    });
  }

}
