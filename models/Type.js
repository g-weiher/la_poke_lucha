const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  name: String,
  double_damage_from: [String],
  double_damage_to: [String],
  half_damage_from: [String],
  half_damage_to: [String],
  no_damage_to: [String],
  no_damage_from: [String],
});

module.exports = mongoose.model("Type", typeSchema);
