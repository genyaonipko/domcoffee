const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  data: {
    type: Object,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("coffee", CoffeeSchema);
