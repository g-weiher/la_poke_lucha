const Type = require("../models/Type");

const typeController = {
  getTypes: async (_, res) => {
    try {
      res.json({
        code: 200,
        message: "successfully fetched types",
        data: await Type.find(),
      });
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: "unexpected server error",
      });
      return;
    }
  },
};
module.exports = typeController;
