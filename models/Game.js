const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    winner: String,
    looser: String,
    turns: Number,
    winnerScore: Number,
    looserScore: Number,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Game", gameSchema);