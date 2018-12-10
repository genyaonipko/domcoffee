const express = require("express");
const router = express.Router();

const degustationControllers = require("../controllers/degustation");

router.get("/", degustationControllers.getAll, degustationControllers.send);
router.post("/", degustationControllers.create, degustationControllers.send);
router.put("/:key", degustationControllers.update, degustationControllers.send);
router.delete("/:key", degustationControllers.deleteOne, degustationControllers.send);

module.exports = router;