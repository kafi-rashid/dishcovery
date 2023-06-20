export class Ingredient {
  "name": string;
  "description": string;
  "quantity": string;
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
  "origin": string;
  "description": string;
  "ingredients": [Ingredient];
  "instructions": string;
  "cookingTime": number;
  "servings": number;
  "image": string;
  "category": [Category];
  "tags": [string];
  "hitCount": number;
  "isPopular": boolean;
}

export class Response {
  "status": number;
  "message": string;
  "data": any;
}