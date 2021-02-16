const Game = require("../models/Game");


const gameController = {
  insertGame: async (req, res) => {
    const { winner, looser, turns, winnerScore, looserScore } = req.body;
    try {
      await Game.create({
        winner,
        looser,
        turns,
        winnerScore,
        looserScore
      });
      res.json({
        code: 200,
        message: "Game History has be saved successfully",
      });
    } catch (e) {
      console.log(Error(e));
      res.status(500).json({
        code: 500,
        message: "Internal mongodb error",
      });
    }
  },
  getAll: async (_, res) => {
    try {
      res.json({
        code: 200,
        message: "successfully fetched all games",
        data: await Game.find({}),
      });
    } catch (e) {
      console.error(e);
      res.json({
        code: 500,
        message: "unexpected server error",
      });
    }
  },
};
module.exports = gameController;
