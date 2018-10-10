const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  sales: {
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

module.exports = mongoose.model("sales", SalesSchema);
