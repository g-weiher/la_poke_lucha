const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemonController");

router.get("/:id/:info", pokemonController.getPokemonInfoById);
router.get("/:id", pokemonController.getPokemonById);
router.get("/", pokemonController.getPokemon);

module.exports = router;
