const pokemonController = {
  getPokemon: (req, res) => {
    res.send("getPokemon VIP");
  },
  getPokemonById: (req, res) => {
    const { id } = req.params;
    res.send("getPokemonByID VIP " + id);
  },
  getPokemonInfoById: (req, res) => {
    const { id, info } = req.params;
    res.send("getPokemonInfoByID VIP " + id + " " + info);
  },
};
module.exports = pokemonController;
