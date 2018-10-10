const mongoose = require("mongoose");

const OwnSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  own: {
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

module.exports = mongoose.model("own", OwnSchema);
