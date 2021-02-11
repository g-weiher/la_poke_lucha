const pokeService = require("../services/pokemonService");

const pokemonController = {
  getPokemon: async (_, res) => {
    try {
      res.json({
        code: 200,
        message: "successfully fetched all pokemon",
        data: await pokeService.getPokemon(),
      });
    } catch(e) {
      console.error(e);
      res.json({
        code: 500,
        message: "unexpected server error",
      });
    }
    
  },
  getPokemonById: async (req, res) => {
    const { id } = req.params;
    try {
      res.json({
        code: 200,
        message: "successfully fetched pokemon by id",
        data: await pokeService.getPokemonById(id),
      });
    } catch (e) {
      console.error(e);
      res.json({
        code: 500,
        message: "unexpected server error",
      });
    }
  },
  getPokemonInfoById: async (req, res) => {
    const { id, info } = req.params;
    try {
      res.json({
        code: 200,
        message: "successfully fetch pokemon-info by pokemon id",
        data: await pokeService.getPokemonInfoById(id, info),
      });
    } catch (e) {
      console.error(e);
      res.json({
        code: 500,
        message: "unexpected server error",
      });
    }
  },
};
module.exports = pokemonController;
