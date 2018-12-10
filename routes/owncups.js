const express = require("express");
const router = express.Router();

const owncupsControllers = require("../controllers/owncups");

router.get("/", owncupsControllers.getAll, owncupsControllers.send);
router.post("/", owncupsControllers.create, owncupsControllers.send);
router.put("/:key", owncupsControllers.update, owncupsControllers.send);
router.delete("/:key", owncupsControllers.deleteOne, owncupsControllers.send);

module.exports = router;
