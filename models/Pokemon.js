const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  id: Number,
  name: { english: String, japanese: String, chinese: String, french: String },
  type: [],
  base: {HP:Number, Attack:Number,Defense:Number,["Sp. Attack"]:Number,["Sp. Defense"]:Number, Speed: Number},
  image: String,
  weight: Number,
  base_experience: Number


});

module.exports = mongoose.model("Pokemon", pokemonSchema);
