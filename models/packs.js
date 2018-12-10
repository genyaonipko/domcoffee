const mongoose = require("mongoose");

const packsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  packs: {
    type: Object,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("packs", packsSchema);
