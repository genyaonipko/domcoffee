const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  coffee: {
    type: Object,
    required: true
  },
  TTL: {
    type: Date,
    default: new Date(Date.now() + 1e5)
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("coffee", CoffeeSchema);
