const mongoose = require("mongoose");

const degustationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  degustation: {
    type: Object,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("degustation", degustationSchema);
