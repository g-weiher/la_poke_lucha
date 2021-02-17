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

//mongoose setup

const { DBPW, DBUSER, DBHOST, DBNAME } = process.env;

const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://${DBUSER}:${DBPW}@${DBHOST}/${DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const pokemonRoute = require("./routes/pokemon");
const typeRoute = require("./routes/types");

const port = process.env.PORT;


app.options("*", cors()); // include before other routes
app.use(cors());

app.use("/pokemon", pokemonRoute);
app.use("/types", typeRoute);
app.get("/", (req, res) => {
  res.send("Bienvenides to our Poke Lucha");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
