const Game = require("../models/Game");
const Pokemon = require("../models/Pokemon");
const Type = require("../models/Type");

const pokemonService = {
  getPokemon: async (limit, offset, nameFilter = "") => {
    const dbRes = await Pokemon.find({
      "name.english": { $regex: `.*${nameFilter}.*`, $options: "i" },
    })
      .limit(limit)
      .skip(offset);
    return dbRes;
  },
  getPokemonByType: async (limit, offset, type, nameFilter = "") => {
    const dbRes = await Pokemon.find({
      "name.english": { $regex: `.*${nameFilter}.*`, $options: "i" },
      type: { $elemMatch: { $regex: type, $options: "i" } },
    })
      .limit(limit)
      .skip(offset);
    return dbRes;
  },
  getPokemonById: async (id) => {
    return await Pokemon.findOne({ id: id });
  },
  getPokemonInfoById: async (id, info) => {
    const pokemon = await Pokemon.findOne({ id: id });
    if (!pokemon) {
      return null;
    }
    const pokeInfo = pokemon[info];
    if (info === "type") {
      return await Promise.all(
        pokeInfo.map((type) => Type.findOne({  name: type.toLowerCase()  }))
      );
    } else return pokeInfo;
  },
};
module.exports = pokemonService;
