const Game = require("../models/Game");
const Pokemon = require("../models/Pokemon");
const axios = require("axios");

const pokemonService = {
  getPokemon: async () => {
    //TODO pagination,
    return await Pokemon.find();
  },
  getPokemonById: async (id) => {
    return await Pokemon.findOne({ id: id });
  },
  getPokemonInfoById: async (id, info) => {
    const pokemon = await Pokemon.findOne({ id: id });
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
