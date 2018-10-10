const express = require("express");
const router = express.Router();
const passport = require("passport");

const userControllers = require("../controllers/user");

router.post("/register", userControllers.register);

router.post("/login", userControllers.login);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userControllers.me
);

router.get("/all", userControllers.getAll, userControllers.send);

router.delete("/:key", userControllers.deleteOne, userControllers.send);

router.put("/:key", userControllers.update, userControllers.send);

module.exports = router;
