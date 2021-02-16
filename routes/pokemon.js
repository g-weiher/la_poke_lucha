const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemonController");


router.get("/", pokemonController.getPokemon);
router.get("/:id/:info", pokemonController.getPokemonInfoById);
router.get("/:id", pokemonController.getPokemonById);



module.exports = router;
