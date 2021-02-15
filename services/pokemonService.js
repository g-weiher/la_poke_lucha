const Game = require("../models/Game");
const Pokemon = require("../models/Pokemon");
const axios = require("axios");

const pokemonService = {
  getPokemon: () => {
    //TODO pagination, 
    return Pokemon.find();
  },
  getPokemonById: async (id) => {
    return Pokemon.find(id);
  },
  getPokemonInfoById: async (id, info) => {
    const pokeInfo = Pokemon.find(id)[info];
    if(info === "type") {
      //for every type of the pokemon create an axios request, bundle them with Promise.all and resolve them all
      const typesResponses = await Promise.all(pokeInfo.map(type => axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`)))
      //create the return objects out of the responses and return them
      return typesResponses.map(response => {
        return { name: response.data.name, ...response.data.damage_relations}
      });
    } else return pokeInfo;
  },
};
module.exports = pokemonService;
