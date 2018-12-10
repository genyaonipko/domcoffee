const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
const usersRouter = require("./routes/user");

const packsRouter = require("./routes/packs");
const degustationRouter = require("./routes/degustation");
const coffeeRouter = require("./routes/coffee");
const portionsRouter = require("./routes/portions");
const innercupsRouter = require("./routes/innercups");
const innerpacksRouter = require("./routes/innerpacks");
const owncupsRouter = require("./routes/owncups");
const ownpacksRouter = require("./routes/ownpacks");


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

app.use("/api/packs", packsRouter);
app.use("/api/degustation", degustationRouter);
app.use("/api/portions", portionsRouter);
app.use("/api/coffee", coffeeRouter);
app.use("/api/innercups", innercupsRouter);
app.use("/api/innerpacks", innerpacksRouter);
app.use("/api/owncups", owncupsRouter);
app.use("/api/ownpacks", ownpacksRouter);

app.use("/api/users", usersRouter);

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
