import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish, Response } from 'src/app/shared/models/dishes.model';
import { DishService } from 'src/app/shared/services/dish.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  dishForm!: FormGroup;
  dish: Dish = new Dish();
  dishId: string = "";
  isLoading: boolean = false;
  isUpdating: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dishService: DishService,
    private _location: Location,
    private _router: Router) {

    this.dishForm = this._formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      origin: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this._formBuilder.array([]),
      instructions: ['', Validators.required],
      cookingTime: ['', Validators.required],
      servings: ['', Validators.required],
      image: ['', Validators.required],
      category: this._formBuilder.array([]),
      tags: ['', Validators.required],
      hitCount: [''],
      isPopular: [false]
    });
    this.addIngredient();
    this.addCategory();
  }

  ngOnInit() {
    this.dishId = this._activatedRoute.snapshot.params["dishId"];
    if (this.dishId) {
      this.isUpdating = true;
      this.getDish(this.dishId);
    }
    else {
      this.isUpdating = false;
    }
  }

  get formControl() { return this.dishForm.controls; }
  get ingredients() { return this.formControl['ingredients'] as FormArray; }
  get category() { return this.formControl['category'] as FormArray; }
  get tags() { return this.formControl['tags'] as FormArray; }

  getDish(dishId: string) {
    this._dishService.getDishById(dishId).subscribe({
      next: (response: Response) => {
        if (response.status === 200) {
          const responseData = response.data;
          const tagsString = responseData.tags.join(', ');
          this.dishForm.patchValue({
            _id: responseData._id,
            title: responseData.title,
            origin: responseData.origin,
            description: responseData.description,
            instructions: responseData.instructions,
            cookingTime: responseData.cookingTime,
            servings: responseData.servings,
            image: responseData.image,
            tags: tagsString
          });
          
          const categoryArray = this.dishForm.get('category') as FormArray;
          categoryArray.clear();
          responseData.category.forEach((category: any) => {
            categoryArray.push(this._formBuilder.group(category));
          });  
          
          const ingredientsArray = this.dishForm.get('ingredients') as FormArray;
          ingredientsArray.clear();
          responseData.ingredients.forEach((ingredient: any) => {
            ingredientsArray.push(this._formBuilder.group(ingredient));
          });
        }
      },
      error: (error) => {
        console.log("Component: Dish", error);        
      }
    });
  }
  
  onSubmit() {
    if (this.dishForm.invalid) {
      return;
    }
    this.dish = this.dishForm.value;    
    if (this.isUpdating === false) {
      this._dishService.addDish(this.dish).subscribe({
        next: (response: Response) => {

        },
        error: (error) => {
          console.log(error);    
          alert("Something went wrong!");    
        },
        complete: () => {
          alert("Dish has been added!");
          this._router.navigate(["/admin/dishes"]);
        }
      })
    }
    else {
      this._dishService.fullUpdateDish(this.dish).subscribe({
        next: (response: Response) => {

        },
        error: (error) => {
          console.log(error);       
          alert("Something went wrong!"); 
        },
        complete: () => {
          alert("Dish has been updated!");
          this._router.navigate(["/admin/dishes"]);          
        }
      })
    }    
  }

  addIngredient() {
    this.ingredients.push(this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      quantity: [''],
      _id: ['']
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addCategory() {
    this.category.push(this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      _id: ['']
    }));
  }

  removeCategory(index: number) {
    this.category.removeAt(index);
  }

  goBack(event: any) {
    event.preventDefault();
    this._location.back();
  }

  confirmDelete(event: any) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this dish?")) {
      this.delete();
    } else {

    }
  }

  delete() {
    this._dishService.deleteDish(this.dishForm.value).subscribe({
      next: (response: Response) => {
      
      },
      error: (error) => {

      },
      complete: () => {
        this._location.back();
      }
    })
  }

}
