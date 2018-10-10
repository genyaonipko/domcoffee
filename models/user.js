const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
});

module.exports = mongoose.model("users", UserSchema);
