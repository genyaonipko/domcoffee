const express = require("express");
const router = express.Router();

const ownpacksControllers = require("../controllers/ownpacks");

router.get("/", ownpacksControllers.getAll, ownpacksControllers.send);
// router.get("/:key", ownpacksControllers.getOne, ownpacksControllers.send);
router.post("/", ownpacksControllers.create, ownpacksControllers.send);
router.put("/:key", ownpacksControllers.update, ownpacksControllers.send);
// router.delete("/", ownpacksControllers.deleteAll, ownpacksControllers.send);
router.delete("/:key", ownpacksControllers.deleteOne, ownpacksControllers.send);

module.exports = router;
