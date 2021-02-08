const pokemonList = require("./pokedex.json");

const pokemonService = {
  getPokemon: () => {
    //console.log(pokemonList);
    return pokemonList;
  },
  getPokemonById: (id) => {
    return pokemonList[id];
  },
  getPokemonInfoById: (id, info) => {
    return pokemonList[id][info];
  },
};
module.exports = pokemonService;
