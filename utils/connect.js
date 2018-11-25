const config = require("../config");
const mongoose = require("mongoose");

const pass = config.db.password.length ? `:${config.db.password}` : "";
const auth = config.db.user.length ? `${config.db.user}${pass}@` : "";

// mongodb://test:test@localhost:27017/cache_db
mongoose.connect(
  `mongodb://onipko:${process.env.API_KEY}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/domcoffee`,
  () => {
    console.log("DB IS STARTED!");
  }
);
