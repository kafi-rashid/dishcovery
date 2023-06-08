import { Component, Input } from '@angular/core';
import { Category, Dish } from '../../models/dishes.model';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent {

  @Input()
  dish: Dish = new Dish();

  getCategory(categories: Category[]) {
    let list: string[] = [];
    categories.map((item: Category) => {
      list.push(item.name);
    });
    return list.join(", ");
  }

}
