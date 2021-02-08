const pokemonList = require("./pokedex.json");

const pokemonService = {
  getPokemon: () => {
    //console.log(pokemonList);
    return pokemonList;
  },
  getPokemonById: (id) => {
    return [];
  },
  getPokemonInfoById: (id, info) => {
    return [];
  },
};
module.exports = pokemonService;
