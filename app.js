const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
const usersRouter = require("./routes/user");

const salesRouter = require("./routes/sales");
const coffeeRouter = require("./routes/coffee");
const ownRouter = require("./routes/own");

const config = require("./config");

require("./utils/connect");
require("./utils/passport");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/sales", salesRouter);
app.use("/coffee", coffeeRouter);
app.use("/users", usersRouter);
app.use("/own", ownRouter);
app.use(express.static("./build"));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const { PORT = 5000 } = process.env;
const { port = PORT } = config;
if (!module.parent) {
  app.listen(port, () => {
    console.log(`SERVER IS STARTED ON PORT: ${port}`);
  });
}

module.exports = app;
