const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  id: Number,
  name: { english: String, japanese: String, chinese: String, french: String },
  type: [],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    Special_Attack: Number,
    Special_Defense: Number,
    Speed: Number,
  },
  image: String,
  image_small: String,
  weight: Number,
  base_experience: Number,
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
