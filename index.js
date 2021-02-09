const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const pokemonRoute = require("./routes/pokemon");

const port = process.env.PORT;


app.use("/pokemon", pokemonRoute);
app.get("/", (req, res) => {
  res.send("Bienvenides to our Poke Lucha");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
