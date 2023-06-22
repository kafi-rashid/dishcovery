const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"]
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
});

mongoose.model("User", userSchema, "Users");