const mongoose = require('mongoose');

const originSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Origin name is required"]
  }
});

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"]
  },
  description: String
});

const ingredientsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ingredient name is required"]
  },
  description: String,
  quantity: {
    type: String,
    required: [true, "Quantity is required"]
  }
});

const dishSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  origin: {
    type: originSchema,
    required: true
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  ingredients: {
    type: [ingredientsSchema],
    required: true,
    validate: {
      validator: function(value) {
        return value && value.length > 0;
      },
      message: "At least one ingredient is required"
    }
  },
  instructions: {
    type: String,
    required: [true, "Instruction is required"]
  },
  cookingTime: {
    type: Number,
    required: true,
    validate: {
      validator: function(time) {
        return time > 0;
      },
      message: "Cooking time is required and can not be less than one minute"
    }
  },
  servings: {
    type: Number,
    default: 1
  },
  image: String,
  category: {
    type: [categorySchema],
    required: true,
    validate: {
      validator: function(category) {
        return category && category.length
      },
      message: "At least one category is required"
    }
  },
  tags: [String],
  hitCount: Number
});

mongoose.model("Dish", dishSchema, "Dish");