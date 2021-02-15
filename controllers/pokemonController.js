const pokeService = require("../services/pokemonService");
const Game = require("../models/Game");


const pokemonController = {
  getPokemon: async (_, res) => {
    try {
      res.json({
        code: 200,
        message: "successfully fetched all pokemon",
        data: await pokeService.getPokemon(),
      });
    } catch (e) {
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
  insertGame: async (req, res) => {
    const { winner, looser, turns } = req.body;
    try {
      await Game.create({
        winner,
        looser,
        turns,
      });
      res.json({
        code: 200,
        message: "Game History has be saved successfully",
      });
    } catch (e) {
      console.log(Error(e));
      res.status(500).json({
        code: 500,
        message: "Internal mongodb error",
      });
    }
  },
};
module.exports = pokemonController;
