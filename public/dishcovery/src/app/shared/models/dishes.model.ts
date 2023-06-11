export class Ingredient {
  "name": string;
  "description": string;
  "quantity": string;
  "_id": string;
}

export class Origin {
  "name": string;
  "_id": string;
}

export class Category {
  "name": string;
  "description": string;
  "_id": string;
}

export class Dish {
  "_id": string;
  "title": string;
  "origin": Origin;
  "description": string;
  "ingredients": [Ingredient];
  "instructions": string;
  "cookingTime": number;
  "servings": number;
  "image": string;
  "category": [Category];
  "tags": [string];
  "hitCount": number;
}