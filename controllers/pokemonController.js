const pokeService = require("../services/pokemonService");

const pokemonController = {
  getPokemon: (req, res) => {
    res.send(pokeService.getPokemon());
  },
  getPokemonById: (req, res) => {
    const { id } = req.params;
    res.send(pokeService.getPokemonById(id));
  },
  getPokemonInfoById: (req, res) => {
    const { id, info } = req.params;

    res.send(pokeService.getPokemonInfoById(id, info));
  },
};
module.exports = pokemonController;
