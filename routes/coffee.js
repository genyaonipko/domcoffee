const express = require("express");
const router = express.Router();

const coffeeControllers = require("../controllers/coffee");

router.get("/", coffeeControllers.getAll, coffeeControllers.send);
router.post("/", coffeeControllers.create, coffeeControllers.send);
router.put("/:key", coffeeControllers.update, coffeeControllers.send);
router.delete("/:key", coffeeControllers.deleteOne, coffeeControllers.send);

module.exports = router;
