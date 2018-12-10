const express = require("express");
const router = express.Router();

const innercupsControllers = require("../controllers/innercups");

router.get("/", innercupsControllers.getAll, innercupsControllers.send);
router.post("/", innercupsControllers.create, innercupsControllers.send);
router.put("/:key", innercupsControllers.update, innercupsControllers.send);
router.delete("/:key", innercupsControllers.deleteOne, innercupsControllers.send);

module.exports = router;