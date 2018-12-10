const mongoose = require("mongoose");

const owncupsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  owncups: {
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

module.exports = mongoose.model("owncups", owncupsSchema);
