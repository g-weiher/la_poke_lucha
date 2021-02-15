const pokeService = require("../services/pokemonService");
const Game = require("../models/Game");


const pokemonController = {
  getPokemon: async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
    try {
      const pokemon = await pokeService.getPokemon(limit, offset);
      console.log();
      res.json({
        code: 200,
        message: "successfully fetched all pokemon",
        data: pokemon,
        next:
          limit && !(pokemon.length < limit)
            ? `${fullUrl}?limit=${limit}&offset=${offset + limit}`
            : null,
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
    if (!/^\d+$/.test(id)) {
      res.status(400).json({
        code: 400,
        message: id + " is not a valid ID",
      });
      return;
    }
    try {
      const pokemon = await pokeService.getPokemonById(id);
      if (!pokemon) {
        res.json({
          code: 404,
          message: "no pokemon found",
        });
        return;
      }
      res.json({
        code: 200,
        message: "successfully fetched pokemon by id",
        data: pokemon,
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
    //validation
    if (!/^\d+$/.test(id)) {
      res.status(400).json({
        code: 400,
        message: id + " is not a valid ID",
      });
      return;
    }
    if (!["type", "base", "name"].includes(info)) {
      res.status(400).json({
        code: 400,
        message: info + " is not a valid Info id",
      });
      return;
    }
    try {
      const pokemon = await pokeService.getPokemonInfoById(id, info);
      if (!pokemon) {
        res.json({
          code: 404,
          message: "no pokemon found",
        });
        return;
      }
      res.json({
        code: 200,
        message: "successfully fetch pokemon-info by pokemon id",
        data: pokemon,
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
