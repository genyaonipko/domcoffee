const express = require("express");
const router = express.Router();

const salesControllers = require("../controllers/sales");

router.get("/", salesControllers.getAll, salesControllers.send);
// router.get("/:key", salesControllers.getOne, salesControllers.send);
router.post("/", salesControllers.create, salesControllers.send);
router.put("/:key", salesControllers.update, salesControllers.send);
// router.delete("/", salesControllers.deleteAll, salesControllers.send);
router.delete("/:key", salesControllers.deleteOne, salesControllers.send);

module.exports = router;
