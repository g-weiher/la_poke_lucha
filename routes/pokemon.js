const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemonController");

router.get("/:id/:info", pokemonController.getPokemonInfoById);
router.get("/:id", pokemonController.getPokemonById);
router.get("/", pokemonController.getPokemon);
router.post("/insertgame", pokemonController.insertGame);

module.exports = router;
