const pokemonList = require("./pokedex.json");
const axios = require("axios");
const Game = require("../models/Game");
const Pokemon = require("../models/Pokemon");

const pokemonService = {
  getPokemon: async (limit, offset) => {
    const dbRes = await Pokemon.find({}).limit(limit).skip(offset);
    return dbRes;
  },
  getPokemonById: async (id) => {
    //request the specified pokemon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { weight, sprites, order } = response.data;
    //we need to subtract 1 from the id to get the array index
    const pokemon = {
      ...pokemonList[id - 1],
      weight,
      picture: sprites.other["official-artwork"].front_default,
      order,
    };
    return pokemon;
  },
  getPokemonInfoById: async (id, info) => {
    const pokeInfo = pokemonList[id][info];
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
