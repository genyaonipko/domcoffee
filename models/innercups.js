const mongoose = require("mongoose");

const innercupsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  innercups: {
    type: Object,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("innercups", innercupsSchema);
