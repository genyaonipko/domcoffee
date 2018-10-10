const express = require("express");
const router = express.Router();

const ownControllers = require("../controllers/own");

router.get("/", ownControllers.getAll, ownControllers.send);
router.post("/", ownControllers.create, ownControllers.send);
router.put("/:key", ownControllers.update, ownControllers.send);
router.delete("/:key", ownControllers.deleteOne, ownControllers.send);

module.exports = router;
