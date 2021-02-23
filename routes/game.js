const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");



router.post("/insertgame", gameController.insertGame);
router.get("/all", gameController.getAll);




module.exports = router;
