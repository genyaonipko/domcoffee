const mongoose = require("mongoose");

const ownpacksSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  ownpacks: {
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

module.exports = mongoose.model("ownpacks", ownpacksSchema);
