const pokeService = require("../services/pokemonService");

const pokemonController = {
  getPokemon: (_, res) => {
    res.json({
      code: 200,
      message: "successfully fetched all pokemon",
      data: pokeService.getPokemon(),
    });
  },
  getPokemonById: (req, res) => {
    const { id } = req.params;
    res.json({
      code: 200,
      message: "successfully fetched pokemon by id",
      data: pokeService.getPokemonById(id),
    });
  },
  getPokemonInfoById: (req, res) => {
    const { id, info } = req.params;
    res.json({
      code: 200,
      message: "successfully fetch pokemon-info by pokemon id",
      data: pokeService.getPokemonInfoById(id, info),
    });
  },
};
module.exports = pokemonController;
