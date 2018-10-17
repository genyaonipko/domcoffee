const express = require("express");
const router = express.Router();

const portionsControllers = require("../controllers/portions");

router.get("/", portionsControllers.getAll, portionsControllers.send);
router.post("/", portionsControllers.create, portionsControllers.send);
router.put("/:key", portionsControllers.update, portionsControllers.send);
router.delete("/:key", portionsControllers.deleteOne, portionsControllers.send);

module.exports = router;
