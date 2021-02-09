const express = require("express");
var cors = require("cors");
var app = express();
//dotenv
const dotenv = require("dotenv");
dotenv.config();

const pokemonRoute = require("./routes/pokemon");

const port = process.env.PORT;

app.options("*", cors()); // include before other routes
app.use(cors());

app.use("/pokemon", pokemonRoute);
app.get("/", (req, res) => {
  res.send("Bienvenides to our Poke Lucha");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
