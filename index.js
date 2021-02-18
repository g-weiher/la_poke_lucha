const express = require("express");
var cors = require("cors");
var app = express();

//dotenv
const dotenv = require("dotenv");
dotenv.config();

// body-parser setup
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // start database
// mongoose.connect(connectionString);

const pokemonRoute = require("./routes/pokemon");
const gameRoute = require("./routes/game");
const typeRoute = require("./routes/types");

const port = process.env.PORT;


app.options("*", cors()); // include before other routes
app.use(cors());

app.use("/pokemon", pokemonRoute);
app.use("/game", gameRoute);
app.use("/types", typeRoute);

app.get("/", (_, res) => {
  res.send("Bienvenides to our Poke Lucha");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
