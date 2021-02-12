const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: { english: String, japanese: String, chinese: String, french: String },
  type: [String, String],
  base: {HP:Number, Attack:Number,Defense:Number,["Sp. Attack"]:Number,["Sp. Defense"]:Number, Speed: Number
  },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
