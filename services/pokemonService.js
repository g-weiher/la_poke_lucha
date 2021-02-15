const axios = require("axios");
const Game = require("../models/Game");
const Pokemon = require("../models/Pokemon");

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
      //for every type of the pokemon create an axios request, bundle them with Promise.all and resolve them all
      const typesResponses = await Promise.all(
        pokeInfo.map((type) =>
          axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`)
        )
      );
      //create the return objects out of the responses and return them
      return typesResponses.map((response) => {
        return { name: response.data.name, ...response.data.damage_relations };
      });
    } else return pokeInfo;
  },
};
module.exports = pokemonService;
