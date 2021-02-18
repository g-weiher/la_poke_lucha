const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon",
    required: true,
  },
  looser:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon",
    required: true,
  },
  turns: Number,
  winnerScore: Number,
  looserScore: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Game", gameSchema);