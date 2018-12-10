const express = require("express");
const router = express.Router();

const packsControllers = require("../controllers/packs");

router.get("/", packsControllers.getAll, packsControllers.send);
router.post("/", packsControllers.create, packsControllers.send);
router.put("/:key", packsControllers.update, packsControllers.send);
router.delete("/:key", packsControllers.deleteOne, packsControllers.send);

module.exports = router;