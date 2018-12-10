const express = require("express");
const router = express.Router();

const innerpacksControllers = require("../controllers/innerpacks");

router.get("/", innerpacksControllers.getAll, innerpacksControllers.send);
router.post("/", innerpacksControllers.create, innerpacksControllers.send);
router.put("/:key", innerpacksControllers.update, innerpacksControllers.send);
router.delete("/:key", innerpacksControllers.deleteOne, innerpacksControllers.send);

module.exports = router;